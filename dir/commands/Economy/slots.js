const { Message, Client, MessageEmbed } = require("discord.js");
const slotItems = ["🍇", "🎰", "🍌", "🍉", "🍋", "💸", "🍒"];
const economy = require("discord-bot-eco");

module.exports = {
  name: "slots",
  description: "Gamble with slots!",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      let author = message.author?.id;
      let money = parseInt(args[0]);
      let win = false;

      if (!money) return message.reply("Please specify an amount of credits.");
      if ((await economy.get(author, "wallet")) < money)
        return message.reply("Be careful, you are betting more than you have.");

      let number = [];
      for (i = 0; i < 3; i++) {
        number[i] = Math.floor(Math.random() * slotItems.length);
      }

      if (number[0] == number[1] && number[1] == number[2]) {
        money *= 9;
        win = true;
      } else if (
        number[0] == number[1] ||
        number[0] == number[2] ||
        number[1] == number[2]
      ) {
        money *= 2;
        win = true;
      }
      if (win) {
        let slotsEmbed1 = new MessageEmbed()
          .setDescription(
            `${slotItems[number[0]]} | ${slotItems[number[1]]} | ${
              slotItems[number[2]]
            }\n\nYou won \`${money}\` credits.`
          )
          .setColor("#363940");
        message.reply({ embeds: [slotsEmbed1] });

        await economy.give(author, money, "wallet");
      } else {
        let slotsEmbed = new MessageEmbed()
          .setDescription(
            `${slotItems[number[0]]} | ${slotItems[number[1]]} | ${
              slotItems[number[2]]
            }\n\nYou lost \`${money}\` credits.`
          )
          .setColor("#363940");
        message.reply({ embeds: [slotsEmbed] });
        await economy.take(author, money, "wallet");
      }
    } catch (err) {
      message.reply("An error occured. Please try again.");
    }
  },
};
