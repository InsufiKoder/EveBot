const { Message, Client, MessageEmbed } = require("discord.js");
const xp = require("simply-xp");

module.exports = {
  name: "leaderboard",
  description: "Shows the xp leaderboard.",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      await xp.leaderboard(client, message.guild.id, 20).then((board) => {
        let lead = [];

        board.forEach((user) => {
          lead.push(`• ${user.tag} - XP: ${user.shortxp}`);
        });

        const leadembed = new MessageEmbed()
          .setColor("RANDOM")
          .setTitle("Top 20 Leaderboard")
          .setDescription(` ${lead.toString().replaceAll(",", "\n")} `)
          .setTimestamp();

        message.reply({ embeds: [leadembed] });
      });
    } catch (err) {
      message.reply("An error occured. Please try again.");
    }
  },
};
