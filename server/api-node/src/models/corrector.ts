import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const model = {
    getAll: async (lang: string) => {
        switch(lang) {
            case "fr": 
                let frResult = await prisma.frenchWords.findMany()
                return frResult
        }
    },
    checkWord: async (word: string, lang: string) => {
        switch(lang) {
            case "fr": 
                let frResult = await prisma.frenchWords.findUnique({
                    where: {
                        word: word
                    }
                })
                return frResult
        }
    },
    getRelatedWord: async (word: string, lang: string) => {
        switch(lang) {
            case "fr": 
                let frResult = await prisma.frenchWords.findMany({
                    where: {
                        length: word.length,
                        word: {
                            startsWith: word[0]
                        }
                    }
                })
                return frResult
        }
        
        return {} 
    },
}

export default model