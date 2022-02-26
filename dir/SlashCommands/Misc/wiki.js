const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "wiki",
  description: "Searches user input in wikipedia.",
  options: [
    {
      name: "query",
      description: "The thing to search on wikipedia",
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
    const body = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
        interaction.options.getString("query")
      )}`
    ).then((res) => res.json().catch(() => {}));

    if (!body) return interaction.followUp("Page not found :x:");

    if (body.title && body.title === "Not found.")
      return interaction.followUp("Error! Page Not Found... :x:");

    const replyEmbed = new MessageEmbed()
      .setTitle(`${body.title}`)
      .addField(
        "More Info",
        `**[Click Here](${body.content_urls.desktop.page})**`,
        true
      )
      .setDescription(`** ${body.extract} **`)
      .setColor("RANDOM")
      .setFooter({
        text: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      });

    if (body.thumbnail) replyEmbed.setThumbnail(body.thumbnail.source);

    interaction.followUp({ embeds: [replyEmbed] });
  },
};
