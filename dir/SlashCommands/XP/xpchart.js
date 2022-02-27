const { Client, CommandInteraction } = require("discord.js");
const xp = require("simply-xp");

module.exports = {
  name: "xpchart",
  description: "Shows the chart of how much xp users have.",
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    xp.charts(interaction, {
      position: 5,
      type: "bar",
    }).then((attach) => {
      interaction.followUp({ files: [attach] });
    });
  },
};
