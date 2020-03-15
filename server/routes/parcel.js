import express from 'express';
const router = express.Router()
import {
    validateParcel
} from '../helpers/validate'
import {
    verifyToken
} from '../middlewares/verifyToken'
import parcelController from '../controller/parcel'

router.get('/parcels', parcelController.getParcels);

router.get('/parcels/:id', parcelController.getParcel);

router.post('/parcels', validateParcel, parcelController.createParcel);

router.put('/parcels/:id/cancel', verifyToken, parcelController.cancelParcel);

router.put('/parcels/:id/destination', verifyToken, parcelController.changeDestination)

router.put('/parcels/:id/presentLocation', verifyToken, parcelController.changePresentLocation)

router.put('/parcels/:id/status', verifyToken, parcelController.changeParcelStatus)

export default router;