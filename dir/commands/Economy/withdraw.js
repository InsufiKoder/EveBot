const { Message, Client, MessageEmbed } = require("discord.js");
const economy = require("discord-bot-eco");

module.exports = {
  name: "withdraw",
  description: "Withdraw money from your bank account.",
  aliases: ["wd"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      const userid = message.author.id;
      let convert = parseInt(args[0]);

      if (args[0] == 0)
        return message.reply("Please insert an amount more than 0.");

      if (isNaN(args[0])) {
        if (args[0] === "all") {
          convert = await economy.get(userid, "bank");
        } else {
          return message.reply("Argument must be a number.");
        }
      }

      if ((await economy.get(userid, "bank")) < convert)
        return message.reply(
          "You have insufficient amount of money to withdraw."
        );

      const replyembed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Success!")
        .setDescription(`Withdrew ${convert}!`)
        .setTimestamp();

      await economy.withdraw(userid, convert);
      message.reply({ embeds: [replyembed] });
    } catch (err) {
      //message.reply("An error occured. Please try again.");
      console.log(err);
    }
  },
};
