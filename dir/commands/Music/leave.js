const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "leave",
  description: "Makes the bot leave the voice channel.",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    client.distube.voices.leave(message);
  },
};
