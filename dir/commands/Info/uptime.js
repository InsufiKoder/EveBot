const { Message, Client, MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "uptime",
  description: "Displays uptime.",
  alias: "up",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const d = moment.duration(message.client.uptime);
    const days = d.days() == 1 ? `${d.days()} day` : `${d.days()} days`;
    const hours = d.hours() == 1 ? `${d.hours()} hour` : `${d.hours()} hours`;
    const minutes =
      d.minutes() == 1 ? `${d.minutes()} minute` : `${d.minutes()} minutes`;
    const seconds =
      d.seconds() == 1 ? `${d.seconds()} second` : `${d.seconds()} seconds`;
    const date = moment().subtract(d, "ms").format("dddd, MMMM Do YYYY");

    const embed = new MessageEmbed()
      .setTitle("Uptime")
      .setDescription(
        `\`\`\`prolog\n${days}, ${hours}, ${minutes}, and ${seconds}\`\`\``
      )
      .addField("Date Launched", date)
      .setFooter(
        message.member.displayName,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp()
      .setColor("RANDOM");

    message.channel.send({ embeds: [embed] });
  },
};
