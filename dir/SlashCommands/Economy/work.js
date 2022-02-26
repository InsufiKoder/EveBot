const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
const economy = require("discord-bot-eco");
const cooldown = new Set();

module.exports = {
  name: "work",
  description: "Work and make money!",
  aliases: ["w"],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   **/
  run: async (client, interaction) => {
    const userid = interaction.user.id;

    const replyembed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Cooldown")
      .setDescription(
        "You should wait 5 minutes before using this command again."
      )
      .setTimestamp()
      .setFooter({
        text: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      });

    setTimeout(() => {
      cooldown.delete(interaction.user.id);
    }, 300000);

    if (cooldown.has(interaction.user.id)) {
      interaction.followUp({ embeds: [replyembed] });
    } else {
      let number = Math.floor(Math.random() * 1500) + 1;
      await economy.give(userid, number, "wallet");

      const balance = await economy.get(userid, "wallet");

      interaction.followUp(
        `Success! you earned ${number} coins. You now have ${balance} coins.`
      );
      cooldown.add(interaction.user.id);
    }
  },
};
