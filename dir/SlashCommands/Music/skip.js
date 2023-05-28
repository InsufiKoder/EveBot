const { Client, CommandInteraction } = require("discord.js");

module.exports = {
  name: "skip",
  description: "Skips the current playing music.",
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

    try {
      const song = await queue.skip();
      interaction.followUp(
        `${client.emotes.success} | Skipped! Now playing:\n${song.name}`
      );
    } catch (e) {
      interaction.followUp(`${client.emotes.error} | ${e}`);
    }
  },
};
