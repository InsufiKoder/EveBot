const { CommandInteraction, Client } = require("discord.js");
const webList = require("../../uselessweblist.js").webListvar;

module.exports = {
  name: "uselessweb",
  description: "Returns a website from https://theuselessweb.com",
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const randomWeb = webList[Math.floor(Math.random() * webList.length)];

    interaction.followUp(`${randomWeb}`);
  },
};
