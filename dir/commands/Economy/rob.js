const { Message, Client, MessageEmbed } = require("discord.js");
const economy = require("discord-bot-eco");
const cooldown = new Set();

module.exports = {
  name: "rob",
  description: "Shows the chart of how much xp users have.",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      const userID = message.author.id;
      const robbedUserID = message.mentions.users.first()?.id || args[0];
      const robbedBalance = await economy.get(robbedUserID, "wallet");

      const cooldownembed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dyanmic: true })
        )
        .setTitle("Cooldown")
        .setDescription(
          "You should wait 30 minutes before using this command again."
        )
        .setTimestamp();

      setTimeout(() => {
        cooldown.delete(message.author.id);
      }, 1800000);

      if (cooldown.has(message.author.id)) {
        message.reply({ embeds: [cooldownembed] });
      } else {
        if (robbedBalance < "7500")
          return message.reply(
            "Robbed user should at least have 7500 coins in their wallet."
          );

        let number = Math.floor(Math.random() * 5000) + 1;
        await economy.take(robbedUserID, number, "wallet");
        await economy.give(userID, number, "wallet");

        const balance = await economy.get(userID, "wallet");

        message.reply(`Robbed ${number} coins! you now have ${balance} coins.`);
        cooldown.add(message.author.id);
      }
    } catch (err) {
      message.reply("An error occured. Please try again.");
    }
  },
};
