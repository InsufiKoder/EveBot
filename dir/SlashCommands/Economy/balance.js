const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
const economy = require("discord-bot-eco");

module.exports = {
  name: "balance",
  description: "Shows balance of the mentioned user.",
  aliases: ["bal"],
  options: [
    {
      name: "user",
      description: "The user you want to check balance of",
      type: "USER",
      required: "false",
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const user = interaction.options.getMember("user") || interaction.user;
    const walletbalance = await economy.get(user.id, "wallet");
    const bankbalance = await economy.get(user.id, "bank");

    // Embeds start
    const replyembed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Balance")
      .setDescription(
        `${user} has ${walletbalance} coins. \n${user} has ${bankbalance} coins in their bank.`
      )
      .setTimestamp()
      .setFooter({
        text: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      });
    // Embeds end

    interaction.followUp({ embeds: [replyembed] });
  },
};
