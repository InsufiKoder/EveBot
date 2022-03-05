const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const economy = require("discord-bot-eco");

module.exports = {
  name: "fishmenu",
  description: "Returns the fish types you can sell.",
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const replyEmbed = new MessageEmbed()
      .setTitle("Fish Menu")
      .setColor("RANDOM")
      .setTimestamp()
      .setFooter({
        text: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .addFields(
        { name: "Goldfish", value: "Sell price: 125 Coins", inline: true },
        { name: "Catfish", value: "Sell price: 250 Coins", inline: true },
        { name: "Swordfish", value: "Sell price: 500 Coins", inline: true },
        { name: "Mackerel", value: "Sell price: 100 Coins", inline: true },
        { name: "Salmon", value: "Sell price: 75 Coins", inline: true },
        { name: "Cod", value: "Sell price: 200 Coins", inline: true }
      );

    interaction.followUp({ embeds: [replyEmbed] });
  },
};
