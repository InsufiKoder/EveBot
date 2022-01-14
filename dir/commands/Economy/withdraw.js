const { Message, Client } = require("discord.js");
const economy = require("discord-bot-eco");

module.exports = {
  name: "withdraw",
  description: "Withdraw money from your bank account.",
  aliases: ["wd"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const userid = message.author.id;
    const convert = parseInt(args);

    try {
      await economy.withdraw(userid, convert);
      message.reply(`Withdrew ${convert}!`);
    } catch (err) {
      message.reply("Please insert an amount greater than 0.");
    }
  },
};
