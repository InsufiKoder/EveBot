const { Message, Client, Util } = require("discord.js");

module.exports = {
  name: "stealemoji",
  description: "Adds the provided emoji to the server.",
  permissions: ["MANAGE_EMOJIS"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      if (!args) return message.reply("Please specify an emoji.");

      for (const rawEmoji of args) {
        const parsedEmoji = Util.parseEmoji(rawEmoji);

        if (parsedEmoji.id) {
          const extension = parsedEmoji.animated ? ".gif" : ".png";
          const url = `https://cdn.discordapp.com/emojis/${
            parsedEmoji.id + extension
          }`;
          message.guild.emojis
            .create(url, parsedEmoji.name)
            .then((emoji) => message.reply(`Added: \`${emoji.url}\``));
        }
      }
    } catch (err) {
      message.reply("An error occured. Please try again.");
    }
  },
};
