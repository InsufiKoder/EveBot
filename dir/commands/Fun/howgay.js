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
      const target = args.slice(0).join(" ") || message.author.username;
      const rng = Math.floor(Math.random() * 101);

      const howgayembed = new MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dyanmic: true })
        )
        .setTitle(`Gay Machine Calculator`)
        .setDescription(`${target} is ` + rng + "% Gay🌈")
        .setColor("RANDOM");

      message.reply({ embeds: [howgayembed] });
    } catch (err) {
      message.reply("An error occured. Please try again.");
    }
  },
};
