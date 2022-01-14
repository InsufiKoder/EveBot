const { Client, CommandInteraction } = require("discord.js");
//TODO: Delete current output and add embeds
module.exports = {
  name: "unban",
  description: "Unbans the mentioned user.",
  userPermissions: "BAN_MEMBERS",
  options: [
    {
      name: "userid",
      description: "Id of the user you want to unban.",
      type: "STRING",
      required: true,
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const userId = interaction.options.getString("userid");

    try {
      interaction.guild.members
        .unban(userId)
        .then((user) => {
          interaction.followUp({
            content: `${user.tag} is unbanned successfully.`,
          });
        })
        .catch(() => {
          interaction.followUp({
            content: "Please specify a banned member's valid id.",
          });
        });
    } catch (err) {
      interaction.followUp("An error occured. Please try again.");
    }
  },
};
