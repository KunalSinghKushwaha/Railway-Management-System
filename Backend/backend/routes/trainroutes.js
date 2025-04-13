import { Router } from "express";
import { getTrains, getTrainById, addTrain, updateTrain, deleteTrain } from "../controllers/traincontroller.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = Router();


router.get("/", getTrains);


router.get("/:id", getTrainById);


router.post("/", authMiddleware, addTrain); 


router.put("/:id", authMiddleware, updateTrain);


router.delete("/:id", authMiddleware, deleteTrain);

export default router;
