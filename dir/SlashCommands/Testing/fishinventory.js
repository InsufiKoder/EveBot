const {
  CommandInteraction,
  Client,
  MessageEmbed,
  Message,
} = require("discord.js");
require("dotenv").config();
const { Database } = require("npm.mongo");
const db = new Database(process.env.MONGOURI);

module.exports = {
  name: "fishinventory",
  description: "Displays mentioned users fish inventory.",
  options: [
    {
      name: "user",
      description: "User to check the inventory of",
      type: "USER",
      required: "true",
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const user = interaction.options.getUser("user");

    let get = await db.get(`UserID_${user.id}.fishes`);

    const replyEmbed = new MessageEmbed()
      .setTitle(`Inventory of ${user.username}`)
      .setColor("RANDOM")
      .setDescription(`${user} has ${get.join(", ")} in their inventory.`)
      .setTimestamp()
      .setFooter({
        text: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      });

    interaction.followUp({ embeds: [replyEmbed] });
  },
};
