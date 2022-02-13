const { Message, Client, MessageEmbed } = require("discord.js");
const economy = require("discord-bot-eco");

module.exports = {
  name: "balance",
  description: "Shows balance of the mentioned user.",
  aliases: ["bal"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      const userid =
        message.mentions.users.first()?.id || args[0] || message.author.id;
      const walletbalance = await economy.get(userid, "wallet");
      const bankbalance = await economy.get(userid, "bank");

      // Turn user's id into mentions
      const user =
        message.guild.members.cache.get(userid) ||
        message.guild.members.cache.find(
          (m) => m.user.tag.toLowerCase() == string.toLowerCase()
        ) ||
        message.guild.members.cache.find(
          (m) => m.nickname.toLowerCase() == string.toLowerCase()
        );

      // Embeds start
      const replyembed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dyanmic: true })
        )
        .setTitle("Balance")
        .setDescription(
          `${user} has ${walletbalance} coins. \n${user} has ${bankbalance} coins in their bank.`
        )
        .setTimestamp();
      // Embeds end

      message.reply({ embeds: [replyembed] });
    } catch (err) {
      const errorembed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Error")
        .setDescription("An error occured. Please try again later.")
        .setTimestamp();

      message.reply({ embeds: [errorembed] });

      console.log(err);
    }
  },
};
