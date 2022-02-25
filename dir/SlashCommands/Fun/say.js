const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "say",
  description: "Repeats what you say.",
  options: [
    {
      name: "input",
      description: "Give something for bot to say",
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
      .setDescription(interaction.options.getString("input"))
      .setTimestamp()
      .setColor("RANDOM")
      .setFooter({
        text: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      });

    interaction.followUp({ embeds: [replyEmbed] });
  },
};
