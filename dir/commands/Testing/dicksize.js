const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "dicksize",
  description: "Guesses your dick size. (%99 correct)",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      const target =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]) ||
        message.author;

      let ppSize = Math.floor(Math.random() * 50) + 1;

      ppSize = "=".repeat(ppSize);
      const ppSizeEmbed = new MessageEmbed()
        .setTitle(`Dick Size Calculator`)
        .setDescription(`${target}'s dick size is: 8` + `${ppSize}` + "D")
        .setColor("RANDOM");

      message.channel.send({ embeds: [ppSizeEmbed] });
    } catch (err) {
      message.reply("An error occured. Please try again.");
    }
  },
};
