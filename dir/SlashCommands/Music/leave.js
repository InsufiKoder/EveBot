const { Client, CommandInteraction } = require("discord.js");

module.exports = {
  name: "leave",
  description: "Makes the bot leave the voice channel.",
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    client.distube.voices.leave(interaction);
    interaction.followUp("Left the voice channel.");
  },
};
