const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
require("dotenv").config();
const translate = require("translate-google");

module.exports = {
  name: "translate",
  description: "Translates. usage: -translate tr Hello.",
  options: [
    {
      name: "language",
      description: "Input a language to translate to",
      type: "STRING",
      required: "true",
    },
    {
      name: "input",
      description: "The thing you want to translate",
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
    const language = interaction.options.getString("language");
    const input = interaction.options.getString("input");

    translate(input, { to: language })
      .then((res) => {
        const replyEmbed = new MessageEmbed()
          .setTitle(`Translated to: ${language}`)
          .setColor("RANDOM")
          .setDescription(
            `\`Original Message:\`
            ${input}\n
            \`Translated Message:\`
            ${res}`
          )
          .setTimestamp()
          .setFooter({
            text: interaction.user.tag,
            iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
          });

        interaction.followUp({ embeds: [replyEmbed] });
      })
      .catch((err) => {
        interaction.followUp(
          "An error occured. Please make sure you gave the bot a correct language to translate to."
        );
      });
  },
};
