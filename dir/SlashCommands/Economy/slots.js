const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
const slotItems = ["🍇", "🎰", "🍌", "🍉", "🍋", "💸", "🍒"];
const economy = require("discord-bot-eco");

module.exports = {
  name: "slots",
  description: "Gamble with slots!",
  options: [
    {
      name: "amount",
      description: "The amount you want to bet",
      type: "INTEGER",
      required: "true",
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    let author = interaction.user.id;
    let money = interaction.options.getInteger("amount");
    let win = false;

    if ((await economy.get(author, "wallet")) < money)
      return interaction.followUp(
        "Be careful, you are betting more than you have."
      );

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
        .setColor("RANDOM")
        .setFooter({
          text: interaction.user.tag,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        });

      interaction.followUp({ embeds: [slotsEmbed1] });

      await economy.give(author, money, "wallet");
    } else {
      let slotsEmbed = new MessageEmbed()
        .setDescription(
          `${slotItems[number[0]]} | ${slotItems[number[1]]} | ${
            slotItems[number[2]]
          }\n\nYou lost \`${money}\` credits.`
        )
        .setColor("RANDOM")
        .setFooter({
          text: interaction.user.tag,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        });

      interaction.followUp({ embeds: [slotsEmbed] });
      await economy.take(author, money, "wallet");
    }
  },
};
