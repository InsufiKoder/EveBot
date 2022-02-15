const { Message, Client } = require("discord.js");
const webList = require("../../uselessweblist.js").webListvar;

module.exports = {
  name: "uselessweb",
  description: "Returns a website from https://theuselessweb.com",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      const randomWeb = webList[Math.floor(Math.random() * webList.length)];

      message.reply(`${randomWeb}`);
    } catch (err) {
      message.reply("An error occured. Please try again.");
    }
  },
};
