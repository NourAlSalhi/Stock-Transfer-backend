import { Request, Response, NextFunction } from "express";
import { LocationService } from "../services/location.service";
import { successResponse } from "../utils/response";

export class LocationController {
  static async getAllLocations(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const locations = await LocationService.getAllLocationsWithStock();
      return successResponse(res, locations, "Locations fetched successfully");
    } catch (err) {
      next(err);
    }
  }
}
