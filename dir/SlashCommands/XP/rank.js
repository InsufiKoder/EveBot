const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
const xp = require("simply-xp");

module.exports = {
  name: "rank",
  description: "Shows user's rank.",
  options: [
    {
      name: "user",
      description: "User to get the rank of",
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
    const member = interaction.options.getMember("user");

    if (member.user.bot)
      return interaction.followUp("Sadly, bots doesn't have ranks.");

    xp.rank(interaction, member.id, interaction.guild.id, {
      background:
        "https://cdn.discordapp.com/attachments/929712523584888846/932209792653606932/dark-minimal-mountains.png",
      color: "#13161b",
    }).then((img) => {
      interaction.followUp({ files: [img] });
    });
  },
};
