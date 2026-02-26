import { Router } from "express";
import { TransferController } from "../controllers/transfer.controller";
const router = Router();
router.post("/", TransferController.createTransfer);
export default router;
