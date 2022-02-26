const { Client, MessageEmbed, CommandInteraction } = require("discord.js");

module.exports = {
  name: "howgay",
  description: "Guesses how gay you are. (%99 correct)",
  options: [
    {
      name: "input",
      description: "The thing you want to calculate the gayness of",
      type: "STRING",
      required: "false",
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const input = interaction.options.getString("input");
    const target = input || interaction.user.username;
    const rng = Math.floor(Math.random() * 101);

    const howgayembed = new MessageEmbed()
      .setTitle(`Gay Machine Calculator`)
      .setDescription(`${target} is ` + rng + "% Gay🌈")
      .setColor("RANDOM")
      .setTimestamp()
      .setFooter({
        text: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      });

    interaction.followUp({ embeds: [howgayembed] });
  },
};
