const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "idtomention",
  aliases: "idm",
  description: "Turns an user id to mention. Only works in current guild.",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      const user = message.guild.members.cache.get(args[0]);

      if (!user)
        return message.reply(
          `Please mention a user or provide a valid user ID.`
        );

      const replyEmbed = new MessageEmbed()
        .setTitle("ID To Mention")
        .setDescription(`The provided user profile is ${user}.`)
        .setColor("RANDOM")
        .setTimestamp();

      message.reply({ embeds: [replyEmbed] });
    } catch (err) {
      message.reply("An error occured. Please try again.");
    }
  },
};
