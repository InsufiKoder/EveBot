const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "howgay",
  description: "Guesses how gay you are. (%99 correct)",
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

      const rng = Math.floor(Math.random() * 101);

      const howgayembed = new MessageEmbed()
        .setTitle(`Gay Machine Calculator`)
        .setDescription(`${target} is ` + rng + "% Gay🌈")
        .setColor("RANDOM");

      message.channel.send({ embeds: [howgayembed] });
    } catch (err) {
      message.reply("An error occured. Please try again.");
    }
  },
};
