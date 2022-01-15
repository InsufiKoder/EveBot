const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  aliases: ["p"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const replyembed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Ping")
      .setDescription(`${client.ws.ping}ms!`)
      .setTimestamp();

    message.channel.send({ embeds: [replyembed] });
  },
};
