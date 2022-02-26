const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
const economy = require("discord-bot-eco");

module.exports = {
  name: "give",
  description: "Give money to the mentioned user.",
  options: [
    {
      name: "amount",
      description: "The amount you want to give",
      type: "INTEGER",
      required: "true",
    },
    {
      name: "user",
      description: "The user you want to give money to",
      type: "USER",
      required: "true",
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const amount = interaction.options.getInteger("amount");
    const user = interaction.options.getMember("user");
    const authorid = interaction.user.id;

    const replyembed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Success!")
      .setDescription(`Sucessfully sent ${amount} coins to ${user}!`)
      .setTimestamp()
      .setFooter({
        text: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      });

    if (amount == 0)
      return interaction.followUp("Please insert an amount more than 0.");

    if ((await economy.get(authorid, "wallet")) < amount)
      return interaction.followUp(
        "You have insufficient amount of money to give."
      );

    await economy.give(user.id, amount, "wallet");
    await economy.take(authorid, amount, "wallet");

    interaction.followUp({ embeds: [replyembed] });
  },
};
