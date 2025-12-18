import { Response, Request } from "express"
import fs from 'fs/promises';
import path from 'path';
import appRoot from 'app-root-path';
import translate from 'google-translate-api-x'
const featuresController = {
    getExplain: async(req: Request, res: Response) => {
        const { word } = req.params
        try {
            const filePath = path.join(appRoot.path, 'data/teny_malagasy_explain.json');

            const data = await fs.readFile(filePath, 'utf-8');
            const dictionary = JSON.parse(data);

            const entry = dictionary.find((item: any) => item.word === word);

            if (entry) {
                res.status(200).send(entry.explain)
            } else {
                res.status(404).send("Mot non trouvé dans le dictionnaire.")
            }
        } catch (error) {
            res.status(500).send("Error")
        }
    },

    getOhabolana: async(req: Request, res: Response) => {
        const { word } = req.params
        try {
            const filePath = path.join(appRoot.path, 'data/ohabolana_final.json');

            const data = await fs.readFile(filePath, 'utf-8');
            const dictionary = JSON.parse(data);

            const entry = dictionary.find((item: any) => item.word === word);

            if (entry) {
                res.status(200).send(entry.ohabolana)
            } else {
                res.status(404).send("Mot non trouvé dans le dictionnaire.")
            }
        } catch (error) {
            res.status(500).send("Error")
        }
    },
    translate: async(req: Request, res: Response) => {
      const {texte, langue} = req.body;
      try {
        if (!['fr', 'en'].includes(langue)) {
          throw new Error('Langue doit être "fr" ou "en"');
        }
        
        const result: any = await translate(texte, {
          from: 'mg',
          to: langue
        });
        res.status(200).send(result.text)
      } catch (error: any) {
        console.error('Erreur:', error.message);
        res.status(500).send("Error")
      }
    }
}

export default featuresController;
