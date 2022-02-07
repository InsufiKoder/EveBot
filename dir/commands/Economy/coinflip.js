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
      const getwallet = await economy.get(userID, "wallet");
      let bet = args[0];
      let amountToBet = parseInt(bet);

      if (!bet) return message.reply("Please specify an amount to bet.");
      if (isNaN(bet)) {
        if (bet === "all") {
          amountToBet = await economy.get(userID, "wallet");
        } else {
          return message.reply("Argument must be a number.");
        }
      }

      if (getwallet < amountToBet)
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
      console.log(err);
    }
  },
};
