const { Message, Client } = require("discord.js");
const economy = require("discord-bot-eco");
const cooldown = new Set();

module.exports = {
  name: "daily",
  description: "Gives you money daily.",
  aliases: ["d"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const userid = message.author.id;
    const amount = 2500;

    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 86400000);

    if (cooldown.has(message.author.id)) {
      message.reply(
        "You should wait 24 hours before using this command again."
      );
    } else {
      await economy.daily(userid, amount);

      message.reply(`${amount} added to your wallet!`);
      cooldown.add(message.author.id);
    }
  },
};
