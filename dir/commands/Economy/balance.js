const { Message, Client, MessageEmbed } = require("discord.js");
const economy = require("discord-bot-eco");

module.exports = {
  name: "balance",
  description: "Shows balance of the mentioned user.",
  aliases: ["bal"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      const userid = message.mentions.users.first().id;
      const walletbalance = await economy.get(userid, "wallet");
      const bankbalance = await economy.get(userid, "bank");

      // Embeds start
      const replyembed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Balance")
        .setDescription(
          `Their wallet balance is ${walletbalance}. \nTheir bank balance is ${bankbalance}.`
        )
        .setTimestamp();
      // Embeds end

      message.reply({ embeds: [replyembed] });
    } catch (err) {
      const authorid = message.author.id;
      const walletbalance2 = await economy.get(authorid, "wallet");
      const bankbalance2 = await economy.get(authorid, "bank");
      // Embeds start
      const AuthorEmbed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Balance")
        .setDescription(
          `Your wallet balance is ${walletbalance2}. \nYour bank balance is ${bankbalance2}.`
        )
        .setTimestamp();

      message.reply({ embeds: [AuthorEmbed] });
    }
  },
};
