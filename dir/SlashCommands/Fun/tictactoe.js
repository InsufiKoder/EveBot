const { CommandInteraction, Client } = require("discord.js");
const simplydjs = require("simply-djs");

module.exports = {
  name: "tictactoe",
  description: "Play tic tac toe with buttons.",
  options: [
    {
      name: "user",
      description: "Mention someone to play with",
      type: "USER",
      required: "true",
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    simplydjs.tictactoe(interaction, {
      embedColor: "RANDOM", //default: #075FFF
      slash: true,
      credit: false,
    });
  },
};
