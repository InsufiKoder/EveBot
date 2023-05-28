const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "filter",
  description: "Sets the filter.",
  options: [
    {
      name: "filter",
      type: 3,
      description: "The filter's name | Choose again to turn off the filter",
      required: true,
      choices: [
        {
          name: "8d",
          value: "3d",
        },
        {
          name: "Bassboost",
          value: "bassboost",
        },
        {
          name: "Echo",
          value: "echo",
        },
        {
          name: "Karaoke",
          value: "karaoke",
        },
        {
          name: "Nightcore",
          value: "nightcore",
        },
        {
          name: "Vaporwave",
          value: "vaporwave",
        },
        {
          name: "Flanger",
          value: "flanger",
        },
        {
          name: "Gate",
          value: "gate",
        },
        {
          name: "Haas",
          value: "haas",
        },
        {
          name: "Reverse",
          value: "reverse",
        },
        {
          name: "Surround",
          value: "surround",
        },
        {
          name: "Mcompand",
          value: "mcompand",
        },
        {
          name: "Phaser",
          value: "phaser",
        },
        {
          name: "Tremolo",
          value: "tremolo",
        },
        {
          name: "Earwax",
          value: "earwax",
        },
      ],
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const queue = client.distube.getQueue(interaction);
    const choose = interaction.options.getString("filter");

    if (!queue)
      return interaction.followUp(
        `${client.emotes.error} | There is nothing in the queue right now!`
      );

    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) {
      return interaction.followUp({
        content: "Please join a voice channel!",
        ephemeral: true,
      });
    }

    await client.distube.setFilter(interaction, choose);

    interaction.followUp(
      `Current queue filter: \`${queue.filters.join(", ") || "Off"}\``
    );
  },
};
