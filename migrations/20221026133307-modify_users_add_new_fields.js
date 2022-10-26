"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("tasks", "description", {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: "",
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {},
};
