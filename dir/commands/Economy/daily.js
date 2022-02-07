const { Message, Client, MessageEmbed } = require("discord.js");
const economy = require("discord-bot-eco");
const cooldown = new Set();

module.exports = {
  name: "daily",
  description: "Gives you money daily.",
  aliases: ["d"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      const cooldownembed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Cooldown")
        .setDescription(
          "You should wait 24 hours before using this command again."
        )
        .setTimestamp();

      setTimeout(() => {
        cooldown.delete(message.author.id);
      }, 86400000);

      if (cooldown.has(message.author.id)) {
        message.reply({ embeds: [cooldownembed] });
      } else {
        let number = Math.floor(Math.random() * 10000) + 1;
        const userid = message.author.id;

        await economy.give(userid, number, "wallet");

        const balance = await economy.get(userid, "wallet");

        message.reply(
          `Success! You earned ${number} coins. You now have ${balance} coins.`
        );
        cooldown.add(message.author.id);
      }
    } catch (err) {
      message.reply("An error occured. Please try again.");
    }
  },
};
