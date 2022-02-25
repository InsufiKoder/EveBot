const { Client, ContextMenuInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "avatar",
  type: "USER",
  /**
   *
   * @param {Client} client
   * @param {ContextMenuInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    const user = await client.users.fetch(interaction.targetId);

    const replyEmbed = new MessageEmbed()
      .setTitle(`${user.tag}'s avatar`)
      .setColor("RANDOM")
      .setImage(user.displayAvatarURL({ dynamic: true }))
      .setTimestamp();

    interaction.followUp({
      embeds: [replyEmbed],
    });
  },
};
