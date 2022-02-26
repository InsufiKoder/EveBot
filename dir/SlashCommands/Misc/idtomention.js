const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "idtomention",
  aliases: "idm",
  description: "Turns an user id to mention. Only works in current guild.",
  options: [
    {
      name: "id",
      description: "id to turn into mention",
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
    const user = interaction.guild.members.cache.get(
      interaction.options.getString("id")
    );

    if (!user) return interaction.followUp(`Please provide a valid user ID.`);

    const replyEmbed = new MessageEmbed()
      .setTitle("ID To Mention")
      .setDescription(`The provided user profile is ${user}.`)
      .setColor("RANDOM")
      .setTimestamp()
      .setFooter({
        text: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      });

    interaction.followUp({ embeds: [replyEmbed] });
  },
};
