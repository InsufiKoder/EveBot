const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "howbased",
  description: "Guesses how based you are. (%99 correct)",
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

      const howbasedEmbed = new MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dyanmic: true })
        )
        .setTitle(`Basedness Calculator`)
        .setDescription(`${target} is ` + rng + "% Based")
        .setColor("RANDOM");

      message.reply({ embeds: [howbasedEmbed] });
    } catch (err) {
      message.reply("An error occured. Please try again.");
    }
  },
};
