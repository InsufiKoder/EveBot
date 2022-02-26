const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
const economy = require("discord-bot-eco");

module.exports = {
  name: "withdraw",
  description: "Withdraw money from your bank account.",
  options: [
    {
      name: "amount",
      description: "The amount you want to withdraw",
      type: "INTEGER",
      required: "true",
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const userid = interaction.user.id;
    const amount = interaction.options.getInteger("amount");

    if (amount == 0)
      return message.reply("Please insert an amount more than 0.");

    const replyembed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Success!")
      .setDescription(`Withdrew ${amount} coins!`)
      .setTimestamp()
      .setFooter({
        text: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      });

    if ((await economy.get(userid, "bank")) < amount)
      return interaction.followUp(
        "You have insufficient amount of money to withdraw."
      );

    await economy.withdraw(userid, amount);
    interaction.followUp({ embeds: [replyembed] });
  },
};
