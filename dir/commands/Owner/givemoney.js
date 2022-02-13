const { Message, Client, MessageEmbed, guild } = require("discord.js");
const economy = require("discord-bot-eco");
require("dotenv").config();

module.exports = {
  name: "givemoney",
  description: "Used to give money.",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args, guild) => {
    try {
      const userID = message.mentions.users.first()?.id || args[1];
      const target =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[1]);
      const amount = parseInt(args[0]);

      if (message.author.id != process.env.OWNERID)
        return message.reply("Only the bot owner can use this command.");

      if (!args[0])
        return message.reply("Please insert how much money you want to add.");

      if (isNaN(amount)) {
        return message.reply("Argument must be a number.");
      }

      if (!args[1])
        return message.reply("Please mention an user or provide a valid id.");

      if (!client.users.cache.get(userID)) {
        return message.reply("User not found.");
      }

      if (!args[2])
        return message.reply(
          "Please mention which place you want to add money to. It can be wallet or bank."
        );

      const replyEmbed = new MessageEmbed()
        .setTitle("Success!")
        .setDescription(`Added ${amount} coins to ${target}'s ${args[2]}.`)
        .setColor("RANDOM")
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dyanmic: true })
        )
        .setTimestamp();

      if (args[2] === "wallet") {
        economy.give(userID, amount, "wallet");
        message.reply({ embeds: [replyEmbed] });
      } else if (args[2] === "bank") {
        economy.give(userID, amount, "bank");
        message.reply({ embeds: [replyEmbed] });
      } else if (args[2]) {
        message.reply("You can only add money to target's bank or wallet.");
      }
    } catch (err) {
      message.reply("An error occured. Please try again.");
    }
  },
};
