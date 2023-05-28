const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "nowplaying",
  description: "Displays the current playing song.",
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

    const song = queue.songs[0];
    const replyEmbed = new MessageEmbed()
      .setAuthor({
        name: "Now Playing",
        iconURL:
          "https://raw.githubusercontent.com/HELLSNAKES/Music-Slash-Bot/main/assets/music.gif",
      })
      .setDescription(`[${song.name}](${song.url})`)
      .addField("**Views:**", song.views.toString(), true)
      .addField("**Like:**", song.likes.toString(), true)
      .addField(
        "**Duration:**",
        `${queue.formattedCurrentTime} / ${song.formattedDuration}`
      )
      .addField("**Link**", `[Download This Song](${song.streamURL})`)
      .setThumbnail(song.thumbnail)
      .setColor("RANDOM")
      .setFooter({
        text: `Requested by ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();

    interaction.followUp({ embeds: [replyEmbed] });
  },
};
