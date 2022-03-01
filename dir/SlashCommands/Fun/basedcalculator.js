const { Client, MessageEmbed, CommandInteraction } = require("discord.js");

module.exports = {
  name: "basedcalculator",
  description:
    "Calculates your basedness, simpness, cringeness, gayness and more! (%99 correct)",
  type: "CHAT_INPUT",
  options: [
    {
      name: "type",
      description: "The thing you want to calculate",
      type: "STRING",
      required: "true",
      choices: [
        {
          name: "Based",
          value: "based",
        },
        {
          name: "Simp",
          value: "simp",
        },
        {
          name: "Gay",
          value: "gay",
        },
        {
          name: "Cringe",
          value: "cringe",
        },
        {
          name: "Gamer",
          value: "gamer",
        },
      ],
    },
    {
      name: "input",
      description: "The thing you want to input",
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
    const type = interaction.options.getString("type");
    const input = interaction.options.getString("input");
    const target = input || interaction.user.username;
    const rng = Math.floor(Math.random() * 101);

    const first = type.charAt(0).toUpperCase();
    const rest = type.slice(1);

    const replyEmbed = new MessageEmbed()
      .setTitle(`${first}${rest}ness Calculator`)
      .setDescription(`${target} is ` + rng + `% ${first}${rest}`)
      .setColor("RANDOM")
      .setTimestamp()
      .setFooter({
        text: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dyanmic: true }),
      });

    interaction.followUp({ embeds: [replyEmbed] });
  },
};
