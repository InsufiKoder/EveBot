const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
const economy = require("discord-bot-eco");

module.exports = {
  name: "coinflip",
  description: "Play coinflip and double your money!",
  options: [
    {
      name: "bet",
      description: "The amount you want to bet",
      type: "STRING",
      required: "true",
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const userID = interaction.user.id;
    const getwallet = await economy.get(userID, "wallet");
    let bet = interaction.options.getString("bet");
    let amountToBet = parseInt(bet);

    if (bet === "all") amountToBet = await economy.get(userID, "wallet");

    if (getwallet < amountToBet)
      return message.reply("Be careful, you are betting more than you have.");

    await economy.take(userID, amountToBet, "wallet");

    function random() {
      const num = Math.floor(Math.random() * 2);
      return num === 1;
    }

    if (random() === true) {
      const WinAmount = amountToBet * 2;
      interaction.followUp(`Congrats! You have won ${WinAmount} coins.`);
      await economy.give(userID, WinAmount, "wallet");
    } else {
      interaction.followUp(`You have lost ${amountToBet} coins.`);
    }
  },
};
