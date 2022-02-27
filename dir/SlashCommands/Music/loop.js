const { Client, MessageEmbed, CommandInteraction } = require("discord.js");

module.exports = {
  name: "loop",
  description: "Loops throught the current song.",
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const queue = client.distube.getQueue(interaction);
    if (!queue)
      return interaction.followUp(
        `${client.emotes.error} | There is nothing playing!`
      );

    let mode = client.distube.setRepeatMode(interaction);
    mode = mode ? (mode === 2 ? "Loop queue" : "Loop song") : "Off";
    interaction.followUp(
      `${client.emotes.repeat} | Set loop mode to \`${mode}\``
    );
  },
};
