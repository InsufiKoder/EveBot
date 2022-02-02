const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "volume",
  aliases: "vol",
  description: "Sets the volume.",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      const queue = client.distube.getQueue(message);
      if (!queue)
        return message.channel.send(
          `${client.emotes.error} | There is nothing in the queue right now!`
        );

      const volume = parseInt(args[0]);
      if (isNaN(volume))
        return message.channel.send(
          `${client.emotes.error} | Please enter a valid number!`
        );
      queue.setVolume(volume);
      message.channel.send(
        `${client.emotes.success} | Volume set to \`${volume}\``
      );
    } catch (err) {
      message.reply("An error occured. Please try again.");
    }
  },
};
