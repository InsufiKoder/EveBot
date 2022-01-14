const { Message, Client } = require("discord.js");
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

    try {
      await economy.give(usrid, convert, "wallet");
      message.reply(`Sucessfully sent ${convert}!`);
    } catch (err) {
      message.reply(
        "You should insert the amount first before mentioning the user."
      );
    }
  },
};
