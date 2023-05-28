const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "shuffle",
  description: "Shuffles the queue.",
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const queue = await client.distube.getQueue(interaction);
    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) {
      return interaction.followUp("Please join a voice channel!");
    }
    if (!queue) {
      return interaction.followUp("There is nothing playing.");
    }

    await client.distube.shuffle(interaction);
    await interaction.followUp("***Shuffled songs in the queue.***");
    const message = await interaction.fetchReply();
    await message.react("🔀");
  },
};
