const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
const xp = require("simply-xp");

module.exports = {
  name: "leaderboard",
  description: "Shows the xp leaderboard.",
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    await xp.leaderboard(client, interaction.guild.id, 10).then((board) => {
      let lead = [];

      board.forEach((user) => {
        lead.push(`• ${user.tag} - XP: ${user.shortxp}`);
      });

      const leadembed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Top 10 Leaderboard")
        .setDescription(` ${lead.toString().replaceAll(",", "\n")} `)
        .setTimestamp();

      interaction.followUp({ embeds: [leadembed] });
    });
  },
};
