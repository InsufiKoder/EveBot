const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
require("dotenv").config();
const { Database } = require("npm.mongo");
const db = new Database(process.env.MONGOURI);
const cooldown = new Set();

module.exports = {
  name: "catch",
  description: "Catches fishes.",
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    setTimeout(() => {
      cooldown.delete(interaction.user.id);
    }, 1800000);

    if (cooldown.has(interaction.user.id)) {
      interaction.followUp(
        "You should wait 30 minutes before using this command again."
      );
    } else {
      var fishes = [
        "Goldfish",
        "Catfish",
        "Swordfish",
        "Mackerel",
        "Salmon",
        "Cod",
      ];

      const catchedFish = fishes[Math.floor(Math.random() * fishes.length)];

      await db.push(`UserID_${interaction.user.id}.fishes`, catchedFish);
      let get = await db.get(`UserID_${interaction.user.id}.fishes`);

      const replyEmbed = new MessageEmbed()
        .setTitle("Success!")
        .setColor("RANDOM")
        .setDescription(
          `You caught a(n) ${catchedFish}! \n DEBUG: ${get.join(", ")}`
        )
        .setTimestamp()
        .setFooter({
          text: interaction.user.tag,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        });

      interaction.followUp({ embeds: [replyEmbed] });

      cooldown.add(interaction.user.id);
    }
  },
};
