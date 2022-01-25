const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "repeat",
  description: "Repeats the song.",
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

    let mode = null;
    switch (args[0]) {
      case "off":
        mode = 0;
        break;
      case "song":
        mode = 1;
        break;
      case "queue":
        mode = 2;
        break;
    }
    if (!mode)
      return message.reply(
        "Please choose a repeat mode. It can be song or queue. You can turn off repeat by using the command again."
      );
    mode = queue.setRepeatMode(mode);
    mode = mode ? (mode === 2 ? "Repeat queue" : "Repeat song") : "Off";
    message.channel.send(
      `${client.emotes.repeat} | Set repeat mode to \`${mode}\``
    );
  },
};
