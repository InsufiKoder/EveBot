const { Message, Client, MessageEmbed } = require("discord.js");
const googleIt = require("google-it");

module.exports = {
  name: "googleit",
  description: "Googles the user input.",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      const replyEmbed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Search Results:")
        .setTimestamp();

      googleIt({ query: args.join(" ") }).then((results) => {
        results.forEach(function (item, index) {
          replyEmbed.addField(
            index + 1 + ": " + item.title,
            "<" + item.link + ">"
          );
        });

        message.reply({ embeds: [replyEmbed] });
      });
    } catch (err) {
      message.reply("An error occured. Please try again.");
    }
  },
};
