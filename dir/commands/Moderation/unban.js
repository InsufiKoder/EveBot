const { Message, Client, MessageEmbed } = require("discord.js");
const rgx = /^(?:<@!?)?(\d+)>?$/;

module.exports = {
  name: "unban",
  description: "Unbans the mentioned member.",
  permissions: ["BAN_MEMBERS"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const id = args[0];

    if (!rgx.test(id)) return message.reply(`Please provide a valid user ID.`);

    const bannedUsers = await message.guild.bans.fetch();
    const user = bannedUsers.get(id).user;

    if (!user)
      return message.reply(
        `Unable to find user, please check the provided ID valid.`
      );

    let reason = args.slice(1).join(" ");

    if (!reason) reason = "`None`";
    if (!reason.length > 1024) reason = reason.slice(0, 1021) + "...";

    await message.guild.members.unban(user, reason);

    const embed = new MessageEmbed()
      .setTitle("Unban Member")
      .setDescription(`${user.tag} was successfully unbanned.`)
      .addField("Reason", `${reason}`)
      .setFooter(
        message.member.displayName,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp()
      .setColor("RANDOM");

    message.channel.send({ embeds: [embed] });
  },
};
