import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const userModel = {
    getAll: () => {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await prisma.user.findMany({
                    orderBy: {
                        id: "desc"
                    }
                })        
                resolve(result)
            } catch (error) {
                reject(new Error("Data error: "+ error))
            } 
        })
    },
    getOne: (id: number) => {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await prisma.user.findUnique({
                    where: {
                        id
                    }
                })
                resolve(result)
            } catch (error) {
                reject(new Error("Data error: "+ error))
            } 
        })
    },
    getByEmail: async(email: string) => {
            let result = await prisma.user.findUnique({
                where: {
                    email
                }
            })
            return result
        
    },
    create: (
        name: string,
		last_name: string,
		email: string,
		password: string,
		
        // file
        
    ) =>{
        return new Promise(async (resolve, reject) => {
            try {
                let result = await prisma.user.create({
                    data: {
                        name,
						last_name,
						email,
						password,
						
                        // file
                        
                    }
                })
                resolve(result)
            } catch (error) {
                reject(new Error("Data error: "+ error))
            } 
        })
    },
    update: (
        id: number,
        name: string,
		last_name: string,
		email: string,
		password: string,
		
        // file
        
    ) =>{
        return new Promise(async (resolve, reject) => {
            try {
                let result = await prisma.user.update({
                    where: {
                        id
                    },
                    data: {
                        name,
						last_name,
						email,
						password,
						
                        // file
                        
                    }
                })
                resolve(result)
            } catch (error) {
                reject(new Error("Data error: "+ error))
            } 
        })
    },
    delete: (id: number) => {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await prisma.user.delete({
                    where: {
                        id
                    }
                })
                resolve(result)
            } catch (error) {
                reject(new Error("Data error: "+ error))
            } 
        })
    },
}

export default userModel;