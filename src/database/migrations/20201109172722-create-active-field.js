module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'active', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    });
  },

  down: async queryInterface => {
    return queryInterface.removeColumn('users', 'active');
  },
};
