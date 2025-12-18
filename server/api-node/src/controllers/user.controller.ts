import { Response, Request } from "express";
import userModel from "../models/user.model";
import bcrypt from 'bcrypt';

const userController = {
    getAll: async (req: Request, res: Response) => {
        try {
            let result = await userModel.getAll();
            res.status(200).send(result)
        } catch (error: any) {
            console.log(error)
            res.status(500).send(error)
        }
    },
    getOne: async (req: Request, res: Response) => {
        try {
            let { id } = req.params
            let result = await userModel.getOne(parseInt(id));
            res.status(200).send(result)
        } catch (error: any) {
            console.log(error)
            res.status(500).send(error)
        }
    },
    create: async (req: Request, res: Response) => {
        let { 
            name,
				last_name,
				email,
				password,
				
        } = req.body
        // file
        
        // Validation des champs requis
        if (!name || !last_name || !email || !password) {
            return res.status(400).json({ error: "Tsy maintsy fenoina ny saha rehetra" });
        }

        try {
            let saltRounds = 10;
            const hash = await bcrypt.hash(password, saltRounds);
 
            let result = await userModel.create(
                name,
				last_name,
				email,
				hash,
				
                // file
                
            )
            res.status(200).send(result)            
        }
        catch (error: any) {
            console.log("Error creating user:", error)
            
            // Gérer les erreurs Prisma spécifiques
            let errorMessage = "Tsy nahomby ny famoronana ny mpampiasa";
            
            if (error && error.message) {
                const errorMsg = error.message.toString();
                
                if (errorMsg.includes("Unique constraint") || errorMsg.includes("Unique constraint failed")) {
                    errorMessage = "Efa nampiasa io email io";
                } else if (errorMsg.includes("P1001") || errorMsg.includes("Can't reach database")) {
                    errorMessage = "Tsy afaka mampifandray amin'ny base de données. Jereo fa mbola miasa ny MySQL.";
                } else if (errorMsg.includes("Data error")) {
                    errorMessage = errorMsg.replace("Data error: ", "");
                } else {
                    errorMessage = errorMsg;
                }
            } else if (error && typeof error === 'string') {
                errorMessage = error;
            }
            
            res.status(500).json({ error: errorMessage })
        }
    },
    login: async (req: Request, res: Response): Promise<void> => {
        let { email, password } = req.body;
        try {
            let user = await userModel.getByEmail(email);
            if (user) {
                const verified = await bcrypt.compare(password, user.password);
                if (verified) {
                    res.status(200).send(user);
                } else {
                    res.status(401).json({ error: "Teny miafina diso" });
                }
            } else {
                res.status(401).json({ error: "Tsy misy ny mpampiasa" });
            }
        } catch (error: any) {
            console.log("Error during login:", error);
            let errorMessage = "Tsy nahomby ny fidirana";
            
            if (error && error.message) {
                errorMessage = error.message.toString();
            }
            
            res.status(500).json({ error: errorMessage });
        }
    },
    update: async (req: Request, res: Response) => {
        let { 
            name,
				last_name,
				email,
				password,
				
        } = req.body
        let id = parseInt(req.body.id)
        
        try {
            
 
            let result = await userModel.update(
                id,
                name,
				last_name,
				email,
				password,
				
                // file
                
            )
            res.status(200).send(result)            
        }
        catch (error: any) {
            console.log(error)
            res.status(500).send(error)
        }
    },
    delete: async (req: Request, res: Response) => {
        let id = parseInt(req.body.id)
        try {
            let result = await userModel.delete(
                id
            )
            res.status(200).send(result)            
        }
        catch (error: any) {
            console.log(error)
            res.status(500).send(error)
        }
    },
}

export default userController;