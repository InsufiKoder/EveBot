const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
const economy = require("discord-bot-eco");
const cooldown = new Set();

module.exports = {
  name: "rob",
  description: "Shows the chart of how much xp users have.",
  options: [
    {
      name: "user",
      description: "The user you want to rob",
      type: "USER",
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
    const robbedUser = interaction.options.getMember("user");
    const robbedBalance = await economy.get(robbedUser.id, "wallet");

    const cooldownembed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Cooldown")
      .setDescription(
        "You should wait 30 minutes before using this command again."
      )
      .setTimestamp()
      .setFooter({
        text: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      });

    setTimeout(() => {
      cooldown.delete(userID);
    }, 1800000);

    if (cooldown.has(userID)) {
      interaction.followUp({ embeds: [cooldownembed] });
    } else {
      if (robbedBalance < "7500")
        return interaction.followUp(
          "Robbed user should at least have 7500 coins in their wallet."
        );

      let number = Math.floor(Math.random() * 5000) + 1;
      await economy.take(robbedUser.id, number, "wallet");
      await economy.give(userID, number, "wallet");

      const balance = await economy.get(userID, "wallet");

      interaction.followUp(
        `Robbed ${number} coins from \`${robbedUser.user.tag}\`! you now have ${balance} coins.`
      );
      cooldown.add(userID);
    }
  },
};
