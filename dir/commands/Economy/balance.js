const { Message, Client } = require("discord.js");
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

      message.reply(
        `Their wallet balance is ${walletbalance}. \nTheir bank balance is ${bankbalance}.`
      );
    } catch (err) {
      const authorid = message.author.id;
      const walletbalance2 = await economy.get(authorid, "wallet");
      const bankbalance2 = await economy.get(authorid, "bank");

      message.reply(
        `Your wallet balance is ${walletbalance2}. \nYour bank balance is ${bankbalance2}.`
      );
    }
  },
};
