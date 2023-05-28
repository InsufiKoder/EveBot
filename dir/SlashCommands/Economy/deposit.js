const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
const economy = require("discord-bot-eco");

module.exports = {
  name: "deposit",
  description: "Deposit money to your bank account.",
  options: [
    {
      name: "amount",
      description: "The amount you want to deposit",
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
      .setDescription(`Deposited ${amount} coins!`)
      .setTimestamp()
      .setFooter({
        text: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      });

    if ((await economy.get(userid, "wallet")) < amount)
      return interaction.followUp(
        "You have insufficient amount of money to deposit."
      );

    await economy.deposit(userid, amount);
    interaction.followUp({ embeds: [replyembed] });
  },
};
