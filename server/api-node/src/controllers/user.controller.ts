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
            console.log(error)
            res.status(500).send(error)
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
                    res.status(401).send("Mot de passe incorrect");
                }
            } else {
                res.status(401).send("Utilisateur non existant");
            }
        } catch (error: any) {
            console.log(error);
            res.status(500).send(error);
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