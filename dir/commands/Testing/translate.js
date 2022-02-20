const { Message, Client, MessageEmbed } = require("discord.js");
require("dotenv").config();
const translate = require("translate-google");

module.exports = {
  name: "translate",
  description: "Translates. usage: -translate tr Merhaba.",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      const language = args[0];
      const input = args.slice(1).join(" ");

      translate(input, { to: language })
        .then((res) => {
          const replyEmbed = new MessageEmbed()
            .setAuthor(
              message.author.tag,
              message.author.displayAvatarURL({ dyanmic: true })
            )
            .setTitle(`Translated to: ${language}`)
            .setColor("RANDOM")
            .setDescription(res)
            .setTimestamp();

          message.reply({ embeds: [replyEmbed] });
        })
        .catch((err) => {
          message.reply(
            "An error occured. Please make sure you gave the bot a language to translate to."
          );
        });
    } catch (err) {
      message.reply(
        "An error occured. Please make sure you gave the bot a language to translate to."
      );
    }
  },
};
