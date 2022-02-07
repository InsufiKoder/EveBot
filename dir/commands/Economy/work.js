const { Message, Client, MessageEmbed } = require("discord.js");
const economy = require("discord-bot-eco");
const cooldown = new Set();

module.exports = {
  name: "work",
  description: "Work and make money!",
  aliases: ["w"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   **/
  run: async (client, message, args) => {
    try {
      const userid = message.author.id;

      const replyembed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Cooldown")
        .setDescription(
          "You should wait 5 minutes before using this command again."
        )
        .setTimestamp();

      setTimeout(() => {
        cooldown.delete(message.author.id);
      }, 300000);

      if (cooldown.has(message.author.id)) {
        message.reply({ embeds: [replyembed] });
      } else {
        let number = Math.floor(Math.random() * 1500) + 1;
        await economy.give(userid, number, "wallet");

        const balance = await economy.get(userid, "wallet");

        message.reply("Working...").then((message) => {
          setTimeout(function () {
            message.edit(
              `Success! you earned ${number} coins. You now have ${balance} coins.`
            );
          }, 2500);
        });
        cooldown.add(message.author.id);
      }
    } catch (err) {
      message.reply("An error occured. Please try again.");
    }
  },
};
