import { LocationService } from "../services/location.service";
import { successResponse } from "../utils/response";
export class LocationController {
    static async getAllLocations(req, res, next) {
        try {
            const locations = await LocationService.getAllLocationsWithStock();
            return successResponse(res, locations, "Locations fetched successfully");
        }
        catch (err) {
            next(err);
        }
    }
}
