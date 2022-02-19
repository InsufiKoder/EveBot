const { Message, Client, MessageEmbed } = require("discord.js");
require("dotenv").config();
const WolframAlphaAPI = require("wolfram-alpha-node");
const waApi = WolframAlphaAPI(process.env.WOLFRAM_APPID);

module.exports = {
  name: "wolfram",
  description: "Searches user input in wolfram.",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      const input = args.join(" ");
      const response = await waApi.getSimple(input);

      const sfbuff = new Buffer.from(response.split(",")[1], "base64");

      message.reply({ files: [{ attachment: sfbuff }] });
    } catch (err) {
      message.reply("An error occured. Please try again.");
    }
  },
};
