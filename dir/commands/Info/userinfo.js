const { Message, Client, MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "userinfo",
  description: "Shows info about user.",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let member = message.mentions.members.last() || message.member;

    if (!member) {
      try {
        member = await message.guild.members.fetch(args[0]);
      } catch {
        member = message.member;
      }
    }

    let rolesname;
    let roles = member.roles.cache
      .sort((a, b) => b.position - a.position)
      .map((role) => role.toString())
      .slice(0, -1);

    rolesname = roles.join(" ");
    if (member.roles.cache.size < 1) rolesname = "No Roles";

    if (!member.roles.cache.size || member.roles.cache.size - 1 < 1)
      roles = `\`None\``;
    const embed = new MessageEmbed()

      .setAuthor(
        `${member.user.tag}`,
        member.user.displayAvatarURL({ dynamic: true })
      )
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setFooter(`ID: ${member.id}`)
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

    message.channel.send({ embeds: [embed] });
  },
};
