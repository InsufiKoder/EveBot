const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "skip",
  description: "Skips the current playing music.",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send(
        `${client.emotes.error} | There is nothing in the queue right now!`
      );

    try {
      const song = await queue.skip();
      message.channel.send(
        `${client.emotes.success} | Skipped! Now playing:\n${song.name}`
      );
    } catch (e) {
      message.channel.send(`${client.emotes.error} | ${e}`);
    }
  },
};
