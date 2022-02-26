const { Client, MessageEmbed, CommandInteraction } = require("discord.js");

module.exports = {
  name: "howbased",
  description: "Guesses how based you are. (%99 correct)",
  type: "CHAT_INPUT",
  options: [
    {
      name: "input",
      description: "The thing you want to calculate the basedness of",
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

    const replyEmbed = new MessageEmbed()
      .setTitle(`Basedness Calculator`)
      .setDescription(`${target} is ` + rng + "% Based")
      .setColor("RANDOM")
      .setTimestamp()
      .setFooter({
        text: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dyanmic: true }),
      });

    interaction.followUp({ embeds: [replyEmbed] });
  },
};
