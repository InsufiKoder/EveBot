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
      const userid = message.mentions.users.first()?.id || message.author.id;
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
      const errorembed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Error")
        .setDescription("An error occured. Please try again later.")
        .setTimestamp();

      message.reply({ embeds: [errorembed] });

      console.log(err);
    }
  },
};
