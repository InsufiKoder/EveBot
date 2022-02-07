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
      const userid = message.author?.id;
      const amount = parseInt(args[0]);

      // Embeds start
      const replyembed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Success!")
        .setDescription(`Deposited ${amount}!`)
        .setTimestamp();

      const args0embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Error")
        .setDescription("Please insert an amount more than 0.")
        .setTimestamp();

      const isnanembed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Error")
        .setDescription("Argument must be a number.")
        .setTimestamp();
      // Embeds end

      if (args[0] == 0) return message.reply({ embeds: [args0embed] });

      if (isNaN(args[0])) return message.reply({ embeds: [isnanembed] });

      if ((await economy.get(userid, "wallet")) < amount)
        return message.reply(
          "You have insufficient amount of money to deposit."
        );

      await economy.deposit(userid, amount);
      message.reply({ embeds: [replyembed] });
    } catch (err) {
      // Embeds start
      const errorembed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Error")
        .setDescription("An error occured. Please try again.")
        .setTimestamp();
      // Embeds end

      message.reply({ embeds: [errorembed] });
    }
  },
};
