export default (sequelize, Sequelize) => {
    const userSchema = {
        id: {
            type: Sequelize.UUID,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,
            allowNull: true
        }
    };

    const User = sequelize.define(
        'users',
        userSchema, {
            timestamps: false
        }
    );

    return User
}