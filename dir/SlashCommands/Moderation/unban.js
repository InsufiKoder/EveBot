const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
const rgx = /^(?:<@!?)?(\d+)>?$/;

module.exports = {
  name: "unban",
  description: "Unbans the mentioned member.",
  userPermissions: ["BAN_MEMBERS"],
  options: [
    {
      name: "id",
      description: "The id of the user you want to unban",
      type: "STRING",
      required: "true",
    },
    {
      name: "reason",
      description: "The reason you unbanned the user",
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
    const id = interaction.options.getString("id");

    if (!rgx.test(id))
      return interaction.followUp(`Please provide a valid user ID.`);

    const bannedUsers = await interaction.guild.bans.fetch();
    const user = bannedUsers.get(id).user;

    if (!user)
      return interaction.followUp(
        `Unable to find user, please check the provided ID valid.`
      );

    let reason = interaction.options.getString("reason");

    if (!reason) reason = "`None`";
    if (!reason.length > 1024) reason = reason.slice(0, 1021) + "...";

    await interaction.guild.members.unban(user, reason);

    const replyEmbed = new MessageEmbed()
      .setTitle("Unban Member")
      .setDescription(`${user.tag} was successfully unbanned.`)
      .addField("Reason", `${reason}`)
      .setFooter({
        text: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp()
      .setColor("RANDOM");

    interaction.followUp({ embeds: [replyEmbed] });
  },
};
