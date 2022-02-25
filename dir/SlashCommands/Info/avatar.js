const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "avatar",
  description: "Displays mentioned user's avatar.",
  options: [
    {
      name: "user",
      description: "Mention an user to get their avatar",
      type: "USER",
      required: "true",
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const Target = interaction.options.getMember("user");

    const replyEmbed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`${Target.user.tag}\'s Avatar`)
      .setImage(Target.displayAvatarURL({ dynamic: true }))
      .setFooter({
        text: `requested by ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      });

    interaction.followUp({ embeds: [replyEmbed] });
  },
};
