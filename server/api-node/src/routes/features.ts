import express from "express"
import featuresController from "../controllers/features"
const router = express.Router()

router.get("/getExplain/:word", featuresController.getExplain)
router.get("/getOhabolana/:word", featuresController.getOhabolana)
router.post("/translate", featuresController.translate)

export default router