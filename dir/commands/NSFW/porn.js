const { Message, Client } = require("discord.js");
const Discord = require("discord.js");
const NSFW = require("discord-nsfw");
const nsfw = new NSFW();

module.exports = {
  name: "porn",
  description: "Sends porn gifs.",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const image = await nsfw.pgif();
    const embed = new Discord.MessageEmbed()
      .setTitle(`Porn gif`)
      .setColor("GREEN")
      .setImage(image);

    const errMessage = "This is not an NSFW Channel.";
    if (!message.channel.nsfw) {
      message.react("💢");

      return message.reply(errMessage).then((msg) => {
        setTimeout(() => msg.delete(), 5000);
      });
    }

    message.channel.send({ embeds: [embed] });
  },
};
