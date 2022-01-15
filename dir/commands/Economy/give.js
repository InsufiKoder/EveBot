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
    const usrid = message.mentions.users.first().id;
    const convert = parseInt(args);

    // Embeds start
    const replyembed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Success!")
      .setDescription(`Sucessfully sent ${convert}!`)
      .setTimestamp();
    // Embeds end

    try {
      await economy.give(usrid, convert, "wallet");
      message.reply({ embeds: [replyembed] });
    } catch (err) {
      // Embeds start
      const errorembed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Error")
        .setDescription(
          "You should insert the amount first before mentioning the user."
        )
        .setTimestamp();
      // Embeds end

      message.reply({ embeds: [errorembed] });
    }
  },
};
