const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
require("dotenv").config();
const { Database } = require("npm.mongo");
const db = new Database(process.env.MONGOURI);
const economy = require("discord-bot-eco");

module.exports = {
  name: "sellfish",
  description: "Used to sell the fishes you own.",
  options: [
    {
      name: "fish",
      description: "The fish to sell",
      type: "STRING",
      required: "true",
      choices: [
        {
          name: "goldfish",
          value: "Goldfish",
        },
        {
          name: "catfish",
          value: "Catfish",
        },
        {
          name: "swordfish",
          value: "Swordfish",
        },
        {
          name: "mackerel",
          value: "Mackerel",
        },
        {
          name: "salmon",
          value: "Salmon",
        },
        {
          name: "cod",
          value: "Cod",
        },
      ],
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const choice = interaction.options.getString("fish");

    let get = await db.get(`UserID_${interaction.user.id}.fishes`);
    if (get.indexOf(choice) <= -1)
      return interaction.followUp(
        "You don't have the fish you want to sell in your inventory."
      );

    await db.pull(`UserID_${interaction.user.id}.fishes`, choice, true);

    if (choice == "Goldfish") {
      economy.give(interaction.user.id, 125, "wallet");
    } else if (choice == "Catfish") {
      economy.give(interaction.user.id, 250, "wallet");
    } else if (choice == "Swordfish") {
      economy.give(interaction.user.id, 500, "wallet");
    } else if (choice == "Mackerel") {
      economy.give(interaction.user.id, 100, "wallet");
    } else if (choice == "Salmon") {
      economy.give(interaction.user.id, 75, "wallet");
    }

    const replyEmbed = new MessageEmbed()
      .setTitle("Success!")
      .setColor("RANDOM")
      .setDescription(`Sold ${choice} successfully!`)
      .setTimestamp()
      .setFooter({
        text: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      });

    interaction.followUp({ embeds: [replyEmbed] });
  },
};
