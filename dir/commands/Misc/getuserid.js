const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "getuserid",
  description: "Returns the provided users id.",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      const user = message.mentions.users.first().id;

      if (!user)
        return message.reply(
          `Please mention a user or provide a valid user ID.`
        );

      const replyEmbed = new MessageEmbed()
        .setTitle("User ID")
        .setDescription(`The provided user id is ${user}.`)
        .setColor("RANDOM")
        .setTimestamp();

      message.reply({ embeds: [replyEmbed] });
    } catch (err) {
      message.reply("An error occured. Please try again.");
    }
  },
};
