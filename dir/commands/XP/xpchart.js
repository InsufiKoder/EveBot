const { Message, Client } = require("discord.js");
const xp = require("simply-xp");

module.exports = {
  name: "xpchart",
  description: "Shows the chart of how much xp users have.",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    xp.charts(message, {
      position: 5,
      type: "bar",
    }).then((attach) => {
      message.reply({ files: [attach] });
    });
  },
};
