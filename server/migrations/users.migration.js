export default {
    up(queryInterface, Sequelize) {
        return queryInterface.createTable(
            "users", {
                id: {
                    type: Sequelize.UUID,
                    primaryKey: true,
                    allowNull: false
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
                    allowNull: false
                },
                password: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                isAdmin: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false
                }
            }, {
                freezeTable: true
            }
        );
    },
    down(queryInterface, Sequelize) {
        return queryInterface.DropTable("users");
    }
};