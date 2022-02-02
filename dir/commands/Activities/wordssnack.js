const { Message, Client } = require("discord.js");
const client = require("../../..");
const { DiscordTogether } = require("discord-together");

client.discordTogether = new DiscordTogether(client);

module.exports = {
  name: "wordssnack",
  description: "Play wordssnack!",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (message.member.voice.channel) {
      client.discordTogether
        .createTogetherCode(message.member.voice.channel.id, "wordsnack")
        .then(async (invite) => {
          return message.channel.send(`${invite.code}`);
        });
    }
    if (!message.member.voice.channel) {
      message.reply("You are not in a voice channel!");
    }
  },
};
