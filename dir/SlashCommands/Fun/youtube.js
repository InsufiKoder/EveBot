const { Client, CommandInteraction } = require("discord.js");
const client = require("../../..");
const { DiscordTogether } = require("discord-together");

client.discordTogether = new DiscordTogether(client);

module.exports = {
  name: "youtube",
  description: "Watch youtube!",
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    if (interaction.member.voice.channel) {
      client.discordTogether
        .createTogetherCode(interaction.member.voice.channel.id, "youtube")
        .then(async (invite) => {
          return interaction.followUp(`${invite.code}`);
        });
    }
    if (!interaction.member.voice.channel) {
      interaction.followUp("You are not in a voice channel!");
    }
  },
};
