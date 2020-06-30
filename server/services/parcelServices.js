import models from '../models';
const { parcel } = models;

export default class ParcelServices {
    static async getUserParcels(id, paginate) {
        return await parcel.findAll({
            where: {
                placeBy: id.toString()
            },
            ...paginate
        })
    }

    static async getParcels(paginate) {
        return await parcel.findAll(...paginate)
    }
}