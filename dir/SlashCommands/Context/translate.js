const { Client, ContextMenuInteraction, MessageEmbed } = require("discord.js");
const translate = require("translate-google");

module.exports = {
  name: "translate",
  type: "MESSAGE",
  /**
   *
   * @param {Client} client
   * @param {ContextMenuInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction) => {
    const msg = await interaction.channel.messages.fetch(interaction.targetId);

    translate(msg.content, { to: "english" })
      .then((res) => {
        const replyEmbed = new MessageEmbed()
          .setTitle("Translated to: english")
          .setDescription(
            `\`Original Message:\`
            ${msg.content}\n
            \`Translated Message:\`
            ${res}`
          )
          .setColor("RANDOM")
          .setTimestamp();

        interaction.followUp({ embeds: [replyEmbed] });
      })
      .catch((err) => {
        interaction.followUp({
          content: "An error occured. Please try again.",
        });
      });
  },
};
