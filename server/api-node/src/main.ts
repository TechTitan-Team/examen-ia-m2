import { Response, Request } from "express"
import express from "express"
import cors from "cors"
import correctorRoute from './routes/corrector'

const app = express()

app.use(cors())
app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.get('/api', (req:Request, res:Response) => {
  res.send('Hello from CorrectorPro API')
})

app.use('/api/corrector', correctorRoute)

app.listen(9002, () => console.log("Api listen on port 9002"))