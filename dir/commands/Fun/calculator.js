const { Message, Client, MessageEmbed } = require("discord.js");
const { Calculator } = require("weky");

module.exports = {
  name: "calculator",
  description: "Calculator with buttons.",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    await Calculator({
      message: message,
      embed: {
        title: "Calculator",
        color: "#5865F2",
        footer: "EvE",
        timestamp: true,
      },
      disabledQuery: "Calculator is disabled!",
      invalidQuery: "The provided equation is invalid!",
      othersMessage: "Only <@{{author}}> can use the buttons!",
    });
  },
};
