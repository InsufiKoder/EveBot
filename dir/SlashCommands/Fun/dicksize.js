const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "dicksize",
  description: "Guesses your dick size. (%99 correct)",
  options: [
    {
      name: "input",
      description: "The thing you want to calculate the dick size of",
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
    const target =
      interaction.options.getString("input") || interaction.user.username;

    let ppSize = Math.floor(Math.random() * 50) + 1;

    ppSize = "=".repeat(ppSize);
    const replyEmbed = new MessageEmbed()
      .setTitle(`Dick Size Calculator`)
      .setDescription(`${target}'s dick size is: 8` + `${ppSize}` + "D")
      .setColor("RANDOM")
      .setTimestamp()
      .setFooter({
        text: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      });

    interaction.followUp({ embeds: [replyEmbed] });
  },
};
