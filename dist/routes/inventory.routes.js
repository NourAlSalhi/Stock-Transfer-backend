import { Router } from "express";
import { InventoryController } from "../controllers/inventory.controller";
const router = Router();
router.get("/", InventoryController.getAllInventory);
export default router;
