module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'company_id', {
      type: Sequelize.UUID,
      references: { model: 'companies', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: async queryInterface => {
    return queryInterface.removeColumn('users', 'company_id');
  },
};
