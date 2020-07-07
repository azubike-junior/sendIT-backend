'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'users', // table name
        'isVerified', // new field name
        {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
      ),
      queryInterface.addColumn(
        'users',
        'resetToken', {
          type: Sequelize.STRING,
          allowNull: true,
        },
      )
    ]);
  },

  down: (queryInterface, Sequelize) => {
     return Promise.all([
       queryInterface.removeColumn('users', 'isVerified'),
       queryInterface.removeColumn('users', 'resetToken'),
     ]);
  }
};
