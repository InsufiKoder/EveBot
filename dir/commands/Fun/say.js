const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "say",
  description: "Repeats what you say.",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const sayEmbed = new MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dyanmic: true })
      )
      .setDescription(args.join(" "))
      .setTimestamp()
      .setColor("RANDOM");

    message.channel.send({ embeds: [sayEmbed] });
  },
};
