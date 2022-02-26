const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
const economy = require("discord-bot-eco");
require("dotenv").config();

module.exports = {
  name: "givemoney",
  description: "Used to give money.",
  options: [
    {
      name: "user",
      description: "The user you want to give money to",
      type: "USER",
      required: "true",
    },
    {
      name: "amount",
      description: "The amount you want to give",
      type: "INTEGER",
      required: "true",
    },
    {
      name: "place",
      description: "The place you want to add money to",
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
    const target = interaction.options.getUser("user");
    const amount = interaction.options.getInteger("amount");

    if (interaction.user.id != process.env.OWNERID)
      return interaction.followUp("Only the bot owner can use this command.");

    const replyEmbed = new MessageEmbed()
      .setTitle("Success!")
      .setDescription(
        `Added ${amount} coins to ${target}'s ${interaction.options.getString(
          "place"
        )}.`
      )
      .setColor("RANDOM")
      .setTimestamp()
      .setFooter({
        text: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      });

    if (interaction.options.getString("place") === "wallet") {
      economy.give(target.id, amount, "wallet");
      interaction.followUp({ embeds: [replyEmbed] });
    } else if (interaction.options.getString("place") === "bank") {
      economy.give(target.id, amount, "bank");
      interaction.followUp({ embeds: [replyEmbed] });
    } else if (interaction.options.getString("place")) {
      interaction.followUp(
        "You can only add money to target's bank or wallet."
      );
    }
  },
};
