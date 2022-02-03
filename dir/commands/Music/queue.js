const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "queue",
  aliases: "q",
  description: "Displays the queue.",
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
        `${client.emotes.error} | There is nothing playing!`
      );

    const q = queue.songs
      .map(
        (song, i) =>
          `${i === 0 ? "Playing:" : `${i}.`} ${song.name} - \`${
            song.formattedDuration
          }\``
      )
      .join("\n");
    message.channel.send(`${client.emotes.queue} | **Server Queue**\n${q}`);
  },
};