const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "stop",
  description: "Stops the current playing music.",
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

    queue.stop();
    message.channel.send(`${client.emotes.success} | Stopped!`);
  },
};
