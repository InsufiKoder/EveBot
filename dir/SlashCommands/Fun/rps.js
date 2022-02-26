const { CommandInteraction, Client } = require("discord.js");
const simplydjs = require("simply-djs");

module.exports = {
  name: "rps",
  description: "Play rock paper scissors with buttons.",
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
    simplydjs.rps(interaction, {
      slash: true,
      credit: false,
    });
  },
};
