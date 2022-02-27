const { Client, CommandInteraction } = require("discord.js");

module.exports = {
  name: "purge",
  description: "Clears specified amount of messages.",
  userPermissions: ["MANAGE_MESSAGES"],
  options: [
    {
      name: "amount",
      description: "Amount of messages to purge",
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
    const amount = interaction.options.getInteger("amount");

    if (amount > 100 || amount < 1)
      return interaction.followUp("Please select a number *between* 100 and 1");

    interaction.channel.bulkDelete(amount).catch((err) => {
      interaction.followUp(
        ":x: Due to Discord Limitations, I cannot delete messages older than 14 days"
      );
    });
  },
};
