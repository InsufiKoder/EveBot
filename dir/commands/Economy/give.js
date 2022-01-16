const { Message, Client, MessageEmbed } = require("discord.js");
const economy = require("discord-bot-eco");

module.exports = {
  name: "give",
  description: "Give money to the mentioned user.",
  aliases: ["dp"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const convert = parseInt(args[0]);
    const usrid = message.mentions.users.first()?.id;
    const authorid = message.author?.id;

    // Embeds start
    const replyembed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Success!")
      .setDescription(`Sucessfully sent ${convert}!`)
      .setTimestamp();

    const args0embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Error")
      .setDescription("Please insert an amount more than 0.")
      .setTimestamp();

    const isnanembed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Error")
      .setDescription("Argument must be a number.")
      .setTimestamp();
    // Embeds end

    if (args[0] == 0) return message.reply({ embeds: [args0embed] });

    if (isNaN(args[0])) return message.reply({ embeds: [isnanembed] });

    if ((await economy.get(authorid, "wallet")) < convert)
      return message.reply("You have insufficient amount of money to give.");

    try {
      await economy.give(usrid, convert, "wallet");
      message.reply({ embeds: [replyembed] });
    } catch (err) {
      // Embeds start
      const errorembed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Error")
        .setDescription(
          "You should mention the user first before inserting the amount."
        )
        .setTimestamp();
      // Embeds end

      message.reply({ embeds: [errorembed] });
    }
  },
};
