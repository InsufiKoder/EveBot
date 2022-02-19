const { Message, Client, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "wiki",
  description: "Searches user input in wikipedia.",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      const body = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
          args.join(" ")
        )}`
      ).then((res) => res.json().catch(() => {}));

      if (!body) return message.reply("Page not found :x:");

      if (body.title && body.title === "Not found.")
        return message.reply("Error! Page Not Found... :x:");

      const replyEmbed = new MessageEmbed()
        .setTitle(`${body.title}`)
        .addField(
          "More Info",
          `**[Click Here](${body.content_urls.desktop.page})**`,
          true
        )
        .setDescription(`** ${body.extract} **`)
        .setColor("RANDOM");

      if (body.thumbnail) replyEmbed.setThumbnail(body.thumbnail.source);

      message.reply({ embeds: [replyEmbed] });
    } catch (err) {
      message.reply("An error occured. Please try again.");
    }
  },
};
