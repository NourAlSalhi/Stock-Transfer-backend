import { Router } from "express";
import { LocationController } from "../controllers/location.controller";

const router = Router();

router.get("/", LocationController.getAllLocations);

export default router;
