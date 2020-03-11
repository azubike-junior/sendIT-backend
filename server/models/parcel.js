export default (sequelize, Sequelize) => {
    const parcelSchema = {
        parcelId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        parcelName: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        destination: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        pickupLocation: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        deliveredOn: {
            type: Sequelize.DATE
        },
        parcelStatus: {
            type: Sequelize.STRING
        },
        presentLocation: {
            type: Sequelize.TEXT
        },
        parcelWeight: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        placedBy: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        sentOn: {
            type: Sequelize.DATE
        },
        parcelWeightScale: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }

    const Parcel = sequelize.define('parcels', parcelSchema, {
        timestamps: false
    })
    return Parcel
}