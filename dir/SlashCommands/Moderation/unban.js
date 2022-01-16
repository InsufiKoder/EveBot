const {
  Client,
  CommandInteraction,
  MessageEmbed,
  Message,
} = require("discord.js");
//TODO: Delete current output and add embeds
module.exports = {
  name: "unban",
  description: "Unbans the mentioned user.",
  userPermissions: "BAN_MEMBERS",
  options: [
    {
      name: "userid",
      description: "Id of the user you want to unban.",
      type: "STRING",
      required: true,
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const userId = interaction.options.getString("userid");
    // Embeds start
    const validid = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Error")
      .setDescription("Please specify a banned member's valid id.")
      .setTimestamp();
    // Embeds end

    try {
      interaction.guild.members
        .unban(userId)
        .then((user) => {
          const successembed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Success!")
            .setDescription(`${user.tag} is unbanned successfully.`)
            .setTimestamp();

          interaction.followUp({ embeds: [successembed] });
        })
        .catch(() => {
          interaction.followUp({ embeds: [validid] });
        });
    } catch (err) {
      const errorembed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Error")
        .setDescription("An error occured. Please try again.")
        .setTimestamp();

      interaction.followUp({ embeds: [errorembed] });
    }
  },
};
