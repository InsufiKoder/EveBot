const { CommandInteraction, MessageEmbed } = require("discord.js");
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
    // Embeds start
    const equalrole = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Equal/Higher role")
      .setDescription(
        "You can't kick this user because their role is higher/equal to yours."
      )
      .setTimestamp();

    const targetsend = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("You are kicked")
      .setDescription(
        `You have been kicked from ${interaction.guild.name}, reason: ${reason}`
      )
      .setTimestamp();

    const kicked = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Success!")
      .setDescription(
        `Kicked ${target.user.tag} successfully. Reason: ${reason}`
      )
      .setTimestamp();
    // Embeds end

    try {
      if (
        target.roles.highest.position >=
        interaction.member.roles.highest.position
      )
        return interaction.followUp({ embeds: [equalrole] });

      await target.send({ embeds: [targetsend] });

      target.kick(reason);

      interaction.followUp({ embeds: [kicked] });
    } catch (err) {
      const errorembed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Error")
        .setDescription("An error occured. Please try again.")
        .setTimestamp();

      interaction.followUp({ embeds: [errorembed] });
    }
  },
};
