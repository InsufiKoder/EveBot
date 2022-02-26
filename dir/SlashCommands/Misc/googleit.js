const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const googleIt = require("google-it");
const { display } = require("google-it/lib/googleIt");

module.exports = {
  name: "googleit",
  description: "Googles the user input.",
  options: [
    {
      name: "query",
      description: "The thing you want to search",
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
    const replyEmbed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Search Results:")
      .setTimestamp();

    googleIt({
      "no-display": "true",
      query: interaction.options.getString("query"),
    }).then((results) => {
      results.forEach(function (item, index) {
        replyEmbed.addField(
          index + 1 + ": " + item.title,
          "<" + item.link + ">"
        );
      });

      interaction.followUp({ embeds: [replyEmbed] });
    });
  },
};
