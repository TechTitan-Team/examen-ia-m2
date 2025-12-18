import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const model = {
    getAll: async () => {
        let mgResult = await prisma.mgWords.findMany()
                return mgResult
    },
    checkWord: async (word: string) => {
        let frResult = await prisma.mgWords.findUnique({
            where: {
                word: word
            }
        })
        return frResult
    },
    getRelatedWord: async (word: string) => {
        let frResult = await prisma.mgWords.findMany({
            where: {
                length: word.length,
                word: {
                    startsWith: word[0]
                }
            }
        })
        return frResult
        
    },
}

export default model