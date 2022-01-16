const { Message, Client, MessageEmbed } = require("discord.js");
const xp = require("simply-xp");

module.exports = {
  name: "rank",
  description: "Shows user's rank.",
  aliases: ["xp"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const member = message.mentions.members.first()?.id || message.author.id;

    try {
      xp.rank(message, member, message.guild.id, {
        background:
          "https://cdn.discordapp.com/attachments/929712523584888846/932209792653606932/dark-minimal-mountains.png",
        color: "#13161b",
      }).then((img) => {
        message.reply({ files: [img] });
      });
    } catch (err) {
      message.reply("An error occured. Please try again.");
    }
  },
};
