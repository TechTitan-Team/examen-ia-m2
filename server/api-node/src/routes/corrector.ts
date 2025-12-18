import express from "express"
import controller from "../controllers/corrector"

const router = express.Router()

router.post("/", controller.getCorrection)

export default router