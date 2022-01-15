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
    const userid = message.author.id;
    // Embeds start
    const replyembed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Cooldown")
      .setDescription(
        "You should wait 5 seconds before using this command again."
      )
      .setTimestamp();
    // Embeds end

    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 5000);

    if (cooldown.has(message.author.id)) {
      message.reply({ embeds: [replyembed] });
    } else {
      economy.work(userid, 25, 250);

      message.reply("Working...").then((message) => {
        setTimeout(function () {
          message.edit("Success!");
        }, 2500);
      });
      cooldown.add(message.author.id);
    }
  },
};
