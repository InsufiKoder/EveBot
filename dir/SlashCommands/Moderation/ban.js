const { CommandInteraction, MessageEmbed } = require("discord.js");
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

    // Embeds start
    const error = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("An error occured")
      .setDescription("An error occured. Please try again.")
      .setTimestamp();
    const banned = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Success!")
      .setDescription(
        `Banned ${target.user.tag} successfully. reason: ${reason}`
      )
      .setTimestamp();
    const targetsend = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("You are banned")
      .setDescription(
        `You have been banned from ${interaction.guild.name}, reason: ${reason}`
      )
      .setTimestamp();
    const equalembed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Equal/Higher role")
      .setDescription(
        "You can't ban this user because their role is higher/equal to yours."
      )
      .setTimestamp();
    // Embeds end

    try {
      if (
        target.roles.highest.position >=
        interaction.member.roles.highest.position
      )
        return interaction.followUp({
          embeds: [equalembed],
        });

      await target.send({ embeds: [targetsend] });

      target.ban({ reason });

      interaction.followUp({
        embeds: [banned],
      });
    } catch (err) {
      interaction.followUp({ embeds: [error] });
    }
  },
};
