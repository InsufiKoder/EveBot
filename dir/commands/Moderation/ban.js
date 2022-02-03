const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "ban",
  description: "Bans the mentioned member.",
  permissions: ["BAN_MEMBERS"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (!member)
      return message.reply(`Please mention a user or provide a valid user ID.`);

    if (member === message.member)
      return message.reply(`You cannot ban yourself.`);

    if (member.roles.highest.position >= message.member.roles.highest.position)
      return message.reply(
        `You cannot ban someone with an equal or higher role.`
      );

    if (!member.bannable)
      return message.reply(`Provided member is not bannable.`);

    let reason = args.slice(1).join(" ");

    if (!reason) reason = "`None`";
    if (reason.length > 1024) reason = reason.slice(0, 1021) + "...";

    await member.ban({ reason: reason });

    //Embeds
    const banembed = new MessageEmbed()
      .setTitle("Ban Member")
      .setDescription(`${member} was successfully banned.`)
      .addField("Reason", `${reason}`)
      .setFooter(
        message.member.displayName,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp()
      .setColor("GREEN");

    const targetsend = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("You are banned")
      .setDescription(
        `You have been banned from ${message.guild.name}, reason: ${reason}.`
      )
      .setTimestamp();
    //Embeds

    await member.send({ embeds: [targetsend] });

    message.reply({ embeds: [banembed] });
  },
};
