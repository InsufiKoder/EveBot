const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
const economy = require("discord-bot-eco");
require("dotenv").config();

module.exports = {
  name: "takemoney",
  description: "Used to take money.",
  options: [
    {
      name: "user",
      description: "The user you want to take money from",
      type: "USER",
      required: "true",
    },
    {
      name: "amount",
      description: "The amount you want to take",
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

    const takePlace = interaction.options.getString("place");
    const replyEmbed = new MessageEmbed()
      .setTitle("Success!")
      .setDescription(`Took ${amount} coins from ${target}'s ${takePlace}.`)
      .setColor("RANDOM")
      .setTimestamp()
      .setFooter({
        text: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      });

    economy.take(target.id, amount, takePlace);
    interaction.followUp({ embeds: [replyEmbed] });
  },
};
