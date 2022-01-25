const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "avatar",
  description: "Displays mentioned user's avatar.",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const Target = message.mentions.users.first() || message.author;

    const response = new MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(`${Target.tag}\'s Avatar`)
      .setImage(Target.displayAvatarURL({ dynamic: true }))
      .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      );

    message.reply({ embeds: [response] });
  },
};
