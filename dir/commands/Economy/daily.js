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
    const userid = message.author.id;
    const amount = 2500;

    // Embeds start
    const cooldownembed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Cooldown")
      .setDescription(
        "You should wait 24 hours before using this command again."
      )
      .setTimestamp();

    const replyembed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Success!")
      .setDescription(`${amount} added to your wallet!`)
      .setTimestamp();
    // Embeds end

    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 86400000);

    if (cooldown.has(message.author.id)) {
      message.reply({ embeds: [cooldownembed] });
    } else {
      await economy.daily(userid, amount);

      message.reply({ embeds: [replyembed] });
      cooldown.add(message.author.id);
    }
  },
};
