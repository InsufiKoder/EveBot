const { Message, Client, MessageEmbed, Guild } = require("discord.js");

module.exports = {
  name: "kick",
  description: "Kicks the mentioned user.",
  permissions: ["KICK_MEMBERS"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args, guild) => {
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (!member)
      return message.reply(`Please mention a user or provide a valid user ID.`);

    if (member === message.member)
      return message.reply(`You cannot kick yourself.`);

    if (member.roles.highest.position >= message.member.roles.highest.position)
      return message.reply(
        `You cannot kick someone with an equal or higher role.`
      );

    if (!member.kickable)
      return message.reply(`Provided member is not kickable.`);

    let reason = args.slice(1).join(" ");

    if (!reason) reason = "`None`";
    if (reason.length > 1024) reason = reason.slice(0, 1021) + "...";

    await member.kick({ reason: reason });

    //Embeds
    const kickembed = new MessageEmbed()
      .setTitle("Kick Member")
      .setDescription(`${member} was successfully kicked.`)
      .addField("Reason", `${reason}`)
      .setFooter(
        message.member.displayName,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp()
      .setColor("RANDOM");

    const targetsend = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("You are kicked")
      .setDescription(
        `You have been kicked from ${message.guild.name}, reason: ${reason}.`
      )
      .setTimestamp();
    //Embeds

    await member.send({ embeds: [targetsend] });

    message.reply({ embeds: [kickembed] });
  },
};
