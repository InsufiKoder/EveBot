const { Message, Client, MessageEmbed } = require("discord.js");
const economy = require("discord-bot-eco");

module.exports = {
  name: "deposit",
  description: "Deposit money to your bank account.",
  aliases: ["dp"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      const userid = message.author.id;
      const convert = parseInt(args);

      // Embeds start
      const replyembed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Success!")
        .setDescription(`Deposited ${convert}!`)
        .setTimestamp();
      // Embeds end

      await economy.deposit(userid, convert);
      message.reply({ embeds: [replyembed] });
    } catch (err) {
      // Embeds start
      const errorembed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Error")
        .setDescription("Please insert an amount greater than 0.")
        .setTimestamp();
      // Embeds end

      message.reply({ embeds: [errorembed] });
    }
  },
};
