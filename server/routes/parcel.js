import express from "express";
const router = express.Router();
import { validateParcel } from "../helpers/validate";
import { verifyToken } from "../middlewares/verifyToken";
import parcelController from "../controller/parcel";

router.get("/parcels", parcelController.getParcels);

router.get("/parcels/:parcelId", parcelController.getParcel);

router.post(
  "/parcels",
  verifyToken,
  validateParcel,
  parcelController.createParcel
);

router.put(
  "/parcels/:parcelId/cancel",
  verifyToken,
  parcelController.cancelParcel
);

router.put(
  "/parcels/:parcelId/destination",
  verifyToken,
  parcelController.changeDestination
);

router.put(
  "/parcels/:parcelId/presentLocation",
  verifyToken,
  parcelController.changePresentLocation
);

router.put(
  "/parcels/:parcelId/status",
  verifyToken,
  parcelController.changeParcelStatus
);

export default router;
