const { Message, Client, MessageEmbed } = require("discord.js");
const { Snake } = require("weky");

module.exports = {
  name: "snake",
  description: "Play snake in discord!",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    await Snake({
      message: message,
      embed: {
        title: "Snake",
        description: "GG, you scored **{{score}}** points!",
        color: "#5865F2",
        footer: "EvE",
        timestamp: true,
      },
      emojis: {
        empty: "⬛",
        snakeBody: "🟩",
        food: "🍎",
        up: "⬆️",
        right: "⬅️",
        down: "⬇️",
        left: "➡️",
      },
      othersMessage: "Only <@{{author}}> can use the buttons!",
      buttonText: "Cancel",
    });
  },
};
