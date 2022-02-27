const { Client, MessageEmbed, CommandInteraction } = require("discord.js");

module.exports = {
  name: "kick",
  description: "Kicks the mentioned member.",
  userPermissions: ["KICK_MEMBERS"],
  options: [
    {
      name: "user",
      description: "User to kick",
      type: "USER",
      required: "true",
    },
    {
      name: "reason",
      description: "The reason you kicked the user",
      type: "STRING",
      required: "false",
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const member = interaction.options.getMember("user");

    if (member === interaction.member)
      return interaction.followUp(`You cannot kick yourself.`);

    if (
      member.roles.highest.position >= interaction.member.roles.highest.position
    )
      return interaction.followUp(
        `You cannot kick someone with an equal or higher role.`
      );

    if (!member.kickable)
      return interaction.followUp(`Provided member is not kickable.`);

    let reason = interaction.options.getString("reason");

    if (!reason) reason = "`None`";
    if (reason.length > 1024) reason = reason.slice(0, 1021) + "...";

    await member.kick({ reason: reason });

    const replyEmbed = new MessageEmbed()
      .setTitle("Ban Member")
      .setDescription(`${member} was successfully kicked.`)
      .addField("Reason", `${reason}`)
      .setFooter({
        text: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp()
      .setColor("GREEN");

    const targetSend = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("You are kicked")
      .setDescription(
        `You have been kicked from ${interaction.guild.name}, reason: ${reason}.`
      )
      .setTimestamp()
      .setFooter({
        text: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      });

    await interaction.followUp({ embeds: [replyEmbed] });

    member.send({ embeds: [targetSend] });
  },
};
