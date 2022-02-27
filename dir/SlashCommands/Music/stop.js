const { Client, CommandInteraction } = require("discord.js");

module.exports = {
  name: "stop",
  description: "Stops the current playing music.",
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const queue = client.distube.getQueue(interaction);
    if (!queue)
      return interaction.followUp(
        `${client.emotes.error} | There is nothing in the queue right now!`
      );

    queue.stop();
    interaction.followUp(`${client.emotes.success} | Stopped!`);
  },
};
