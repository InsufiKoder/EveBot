const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "userinfo",
  description: "Shows info about user.",
  options: [
    {
      name: "user",
      description: "Mention the user you want to get info about",
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
    let member = interaction.options.getMember("user");

    let rolesname;
    let roles = member.roles.cache
      .sort((a, b) => b.position - a.position)
      .map((role) => role.toString())
      .slice(0, -1);

    rolesname = roles.join(" ");
    if (member.roles.cache.size < 1) rolesname = "No Roles";

    if (!member.roles.cache.size || member.roles.cache.size - 1 < 1)
      roles = `\`None\``;

    const replyEmbed = new MessageEmbed()
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setFooter({
        text: `Requested by ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp()
      .setColor("RANDOM")
      .setDescription(
        `**User:** \`${member.user.username}\` | \`#${
          member.user.discriminator
        }\`\n**ID:** \`${member.id}\`\n**Joined Discord At:** \`${moment(
          member.user.createdAt
        ).format(
          "MMMM Do YYYY, h:mm:ss a"
        )}\`\n**Joined Server on:** \`${moment(member.joinedAt).format(
          "MMMM Do YYYY, h:mm:ss a"
        )}\`\n**Roles [${roles.length || "0"}]: ** ${
          rolesname || `\`That user has no roles\``
        }`
      );

    interaction.followUp({ embeds: [replyEmbed] });
  },
};
