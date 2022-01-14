const { CommandInteraction } = require("discord.js");
//TODO: Delete current output and add embeds
module.exports = {
  name: "kick",
  description: "Kicks the mentioned user",
  userPermissions: ["KICK_MEMBERS"],
  options: [
    {
      name: "member",
      description: "Member to kick.",
      type: "USER",
      required: true,
    },
    {
      name: "reason",
      description: "Reason for the kick.",
      type: "STRING",
      required: false,
    },
  ],
  /**
   *
   * @param {Client} Client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    const target = interaction.options.getMember("member");
    const reason =
      interaction.options.getString("reason") || "No reason provided";
    try {
      if (
        target.roles.highest.position >=
        interaction.member.roles.highest.position
      )
        return interaction.followUp({
          content:
            "You can't kick this user because their role is higher/equal to yours.",
        });

      await target.send(
        `You have been kicked from ${interaction.guild.name}, reason: ${reason}`
      );

      target.kick(reason);

      interaction.followUp({
        content: `Kicked ${target.user.tag} successfully. reason: ${reason}`,
      });
    } catch (err) {
      interaction.followUp({ content: "An error occured. Please try again." });
    }
  },
};
