const { Message, Client, MessageEmbed } = require("discord.js");
const economy = require("discord-bot-eco");
require("dotenv").config();

module.exports = {
  name: "takemoney",
  description: "Used to take money.",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      const userID = message.mentions.users.first()?.id || args[1];
      const amount = parseInt(args[0]);

      if (message.author.id != process.env.OWNERID)
        return message.reply("Only the bot owner can use this command.");

      economy.take(userID, amount, "wallet");
      message.reply(`Took ${amount} coins from user.`);
    } catch (err) {
      message.reply("An error occured. Please try again.");
    }
  },
};
