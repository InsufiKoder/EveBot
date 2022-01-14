const { CommandInteraction } = require("discord.js");
//TODO: Delete current output and add embeds
module.exports = {
  name: "ban",
  description: "Bans the mentioned user",
  userPermissions: ["KICK_MEMBERS"],
  options: [
    {
      name: "member",
      description: "Member to ban.",
      type: "USER",
      required: true,
    },
    {
      name: "reason",
      description: "Reason for the ban.",
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

    if (
      target.roles.highest.position >= interaction.member.roles.highest.position
    )
      return interaction.followUp({
        content:
          "You can't ban this user because their role is higher/equal to yours.",
      });

    await target.send(
      `You have been banned from ${interaction.guild.name}, reason: ${reason}`
    );

    target.ban({ reason });

    interaction.followUp({
      content: `Banned ${target.user.tag} successfully. reason: ${reason}`,
    });
  },
};
