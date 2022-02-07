const { Message, Client, MessageEmbed } = require("discord.js");
const economy = require("discord-bot-eco");

module.exports = {
  name: "coinflip",
  aliases: ["cf"],
  description: "Play coinflip and double your money!",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      const userID = message.author?.id;

      if (!args[0]) return message.reply("Please specify an amount to bet.");

      if (isNaN(args[0])) return message.reply("Argument must be a number.");

      const amountToBet = parseInt(args[0]);

      if ((await economy.get(userID, "wallet")) < amountToBet)
        return message.reply("Be careful, you are betting more than you have.");

      await economy.take(userID, amountToBet, "wallet");

      function random() {
        const num = Math.floor(Math.random() * 2);
        return num === 1;
      }

      if (random() === true) {
        const WinAmount = amountToBet * 2;
        message.channel.send(`Congrats! You have won ${WinAmount}.`);
        await economy.give(userID, WinAmount, "wallet");
      } else {
        message.channel.send(`You have lost ${amountToBet}.`);
      }
    } catch (err) {
      message.reply("An error occured. Please try again.");
    }
  },
};
