import { Response, Request } from "express"
import model from "../models/corrector"
import { levenshteinDistance } from "../services/services"

interface correctionResult {
    word: string,
    correction: Array<object>
}
interface levenshteinResult {
    word: string,
    distance: number
}
interface dictionaryResult {
    id:   number,
    createdAt: Date,
    word: string,
    length: number
}

const getLevenshteinWord = (word: string, qWords: any): Array<levenshteinResult> => {
    let resultArr: Array<levenshteinResult> = []

    qWords.forEach((q:dictionaryResult) => {
        resultArr.push({
            word: q.word,
            distance: parseInt(levenshteinDistance(word, q.word))
        })
    })

    resultArr.sort((a:levenshteinResult, b:levenshteinResult) => {
        return a.distance - b.distance;
    });

    // first 6 
    let response = []
    for (let i = 0; i < resultArr.length && i < 6; i++) {
        response.push(resultArr[i]);
    }
    
    return response
}

const geTextCorrection =  async (text: string, lang: string) => {
    let textArray = text.split(" ")
    let corrections: Array<correctionResult>  = []

    for await (let word of textArray) {
        word = word.trim().replace("<br>","")
        let exist = await model.checkWord(word, lang)
        if(!exist || !exist.length) {
            let qWords = await model.getRelatedWord(word, lang)
            if(qWords) {
                let arr = {
                    word,
                    correction: getLevenshteinWord(word, qWords)
                }
                corrections.push(arr)
            }
        }
    }

    return corrections
}

const controller = {
    getCorrection: async (req: Request, res: Response) => {
        let { text, lang } = req.body
        try {
            let corrections = await geTextCorrection(text.toLowerCase(), lang)
            let incorrect_words: Array<string> = []
            corrections.forEach((correct: correctionResult) => {
                incorrect_words.push(correct.word)
            })

            if(corrections) {
                res.status(200).send({
                    incorrect_words,
                    corrections
                })
            }
            else
                res.status(200).send([])
        }
        catch (error: any) {
            console.log(error)
            res.status(500).send(error.message)
        }
    },
}

export default controller