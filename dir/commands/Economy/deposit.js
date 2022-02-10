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
      let amount = parseInt(args[0]);

      if (args[0] == 0)
        return message.reply("Please insert an amount more than 0.");

      if (isNaN(args[0])) {
        if (args[0] === "all") {
          amount = await economy.get(userid, "wallet");
        } else {
          return message.reply("Argument must be a number.");
        }
      }

      const replyembed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Success!")
        .setDescription(`Deposited ${amount} coins!`)
        .setTimestamp();

      if ((await economy.get(userid, "wallet")) < amount)
        return message.reply(
          "You have insufficient amount of money to deposit."
        );

      await economy.deposit(userid, amount);
      message.reply({ embeds: [replyembed] });
    } catch (err) {
      const errorembed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Error")
        .setDescription("An error occured. Please try again.")
        .setTimestamp();

      message.reply({ embeds: [errorembed] });
    }
  },
};
