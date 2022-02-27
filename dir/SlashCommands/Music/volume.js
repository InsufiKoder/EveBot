const { Client, CommandInteraction } = require("discord.js");

module.exports = {
  name: "volume",
  description: "Sets the volume.",
  options: [
    {
      name: "volume",
      description: "The value you want the volume to be",
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
    const queue = client.distube.getQueue(interaction);
    if (!queue)
      return interaction.followUp(
        `${client.emotes.error} | There is nothing in the queue right now!`
      );

    const volume = interaction.options.getInteger("volume");
    if (volume < 1 || volume > 200) {
      return interaction.followUp(
        "Please enter a valid number (between 1 and 200)"
      );
    }

    queue.setVolume(volume);
    interaction.followUp(
      `${client.emotes.success} | Volume set to \`${volume}\``
    );
  },
};
