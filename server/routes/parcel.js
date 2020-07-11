import express from "express";
const router = express.Router();
import {
  validateParcel
} from "../helpers/validate";
import isAdmin, {
  verifyToken,
  isNotAdmin
} from "../middlewares/verifyToken";
import parcelController from "../controller/parcel";

router.get("/", parcelController.getParcels);

router.get('/userParcels', verifyToken, parcelController.getUserParcel)

router.get("/:parcelId", parcelController.getParcel);

router.post("/", validateParcel, verifyToken, parcelController.createParcel);

router.put(
  "/:parcelId/cancel",
  verifyToken,
  parcelController.cancelParcel
);

router.put(
  "/:parcelId/destination",
  isNotAdmin,
  verifyToken,
  parcelController.changeDestination
);

router.put(
  "/:parcelId/presentLocation",
  isAdmin,
  verifyToken,
  parcelController.changePresentLocation
);

router.put(
  "/:parcelId/status",
  isAdmin,
  verifyToken,
  parcelController.changeParcelStatus
);

export default router;