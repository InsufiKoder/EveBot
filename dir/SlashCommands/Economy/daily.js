const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
const economy = require("discord-bot-eco");
const cooldown = new Set();

module.exports = {
  name: "daily",
  description: "Gives you money daily.",
  aliases: ["d"],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const cooldownembed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Cooldown")
      .setDescription(
        "You should wait 24 hours before using this command again."
      )
      .setTimestamp()
      .setFooter({
        text: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      });

    setTimeout(() => {
      cooldown.delete(interaction.user.id);
    }, 86400000);

    if (cooldown.has(interaction.user.id)) {
      interaction.followUp({ embeds: [cooldownembed] });
    } else {
      let number = Math.floor(Math.random() * 10000) + 1;

      await economy.give(interaction.user.id, number, "wallet");

      const balance = await economy.get(interaction.user.id, "wallet");

      interaction.followUp(
        `Success! You earned ${number} coins. You now have ${balance} coins.`
      );
      cooldown.add(interaction.user.id);
    }
  },
};
