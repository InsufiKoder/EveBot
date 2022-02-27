const { Client, MessageEmbed, CommandInteraction } = require("discord.js");

module.exports = {
  name: "queue",
  aliases: "q",
  description: "Displays the queue.",
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

    const q = queue.songs
      .map(
        (song, i) =>
          `${i === 0 ? "Playing:" : `${i}.`} ${song.name} - \`${
            song.formattedDuration
          }\``
      )
      .join("\n");

    const replyEmbed = new MessageEmbed()
      .setTitle(`${client.emotes.queue} **Server Queue**`)
      .setDescription(`${q}`)
      .setColor("RANDOM")
      .setTimestamp()
      .setFooter({
        text: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      });

    interaction.followUp({ embeds: [replyEmbed] });
  },
};
