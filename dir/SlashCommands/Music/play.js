const { Client, CommandInteraction } = require("discord.js");

module.exports = {
  name: "play",
  description: "Plays music.",
  options: [
    {
      name: "query",
      description: "The url/name to search on youtube/spotify",
      type: "STRING",
      required: "true",
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const search = interaction.options.getString("query");

    if (!interaction.member.voice.channel)
      return interaction.followUp("Please join a voice channel first.");

    await interaction.followUp("🔍 **Searching and attempting...**");

    client.distube.play(interaction.member.voice.channel, search, {
      member: interaction.member,
      textChannel: interaction.channel,
      interaction,
    });
  },
};
