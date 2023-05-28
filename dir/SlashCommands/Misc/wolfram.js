const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
require("dotenv").config();
const WolframAlphaAPI = require("wolfram-alpha-node");
const waApi = WolframAlphaAPI(process.env.WOLFRAM_APPID);

module.exports = {
  name: "wolfram",
  description: "Searches user input in wolfram.",
  options: [
    {
      name: "query",
      description: "The thing to search on wolfram",
      type: "STRING",
      required: "true",
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    try {
      const input = interaction.options.getString("query");
      const response = await waApi.getSimple(input);

      const sfbuff = new Buffer.from(response.split(",")[1], "base64");

      interaction.followUp({ files: [{ attachment: sfbuff }] });
    } catch (error) {
      interaction.followUp("An Error occured:" + error);
    }
  },
};
