const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "getuserid",
  description: "Returns the provided users id.",
  options: [
    {
      name: "user",
      description: "The user to get the id of",
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
    const user = interaction.options.getMember("user").id;

    const replyEmbed = new MessageEmbed()
      .setTitle("User ID")
      .setDescription(`The provided user id is \`${user}\`.`)
      .setColor("RANDOM")
      .setTimestamp()
      .setFooter({
        text: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      });

    interaction.followUp({ embeds: [replyEmbed] });
  },
};
