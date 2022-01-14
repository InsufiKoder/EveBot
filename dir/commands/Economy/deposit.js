const { Message, Client } = require("discord.js");
const economy = require("discord-bot-eco");

module.exports = {
  name: "deposit",
  description: "Deposit money to your bank account.",
  aliases: ["dp"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      const userid = message.author.id;
      const convert = parseInt(args);

      await economy.deposit(userid, convert);
      message.reply(`Deposited ${convert}!`);
    } catch (err) {
      message.reply("Please insert an amount greater than 0.");
    }
  },
};
