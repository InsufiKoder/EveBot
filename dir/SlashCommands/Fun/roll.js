const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "roll",
  description: "Rolls a dice.",
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    let limit = 12;

    const n = Math.floor(Math.random() * limit + 1);

    const replyEmbed = new MessageEmbed()
      .setTitle("🎲  Dice Roll  🎲")
      .setDescription(`${interaction.user}, you rolled a **${n}**!`)
      .setTimestamp()
      .setColor("RANDOM")
      .setFooter({
        text: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      });

    interaction.followUp({ embeds: [replyEmbed] });
  },
};
