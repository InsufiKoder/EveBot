const { CommandInteraction, Client } = require("discord.js");
const simplydjs = require("simply-djs");

module.exports = {
  name: "calculator",
  description: "Calculator with buttons.",
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    simplydjs.calculator(interaction, {
      embedColor: "RANDOM",
      slash: true,
      credit: false,
    });
  },
};
