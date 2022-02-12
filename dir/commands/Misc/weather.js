const { Message, Client, MessageEmbed } = require("discord.js");
const weather = require("weather-js");

module.exports = {
  name: "weather",
  description: "Returns the weather on provided location.",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      if (args.length === 0) return message.reply("Please enter a location.");

      weather.find(
        { search: args.join(" "), degreeType: "C" },
        function (err, result) {
          if (result.length === 0)
            return message.reply("Please enter a valid location.");

          var current = result[0].current;
          var location = result[0].location;

          let embed = new MessageEmbed()
            .setDescription(`**${current.skytext}**`)
            .setAuthor(`Weather for ${current.observationpoint}`)
            .setThumbnail(current.imageUrl)
            .setColor("RANDOM")
            .addField("Timezone", `UTC${location.timezone}`, true)
            .addField("Degree Type", location.degreetype, true)
            .addField("Temperature", `${current.temperature} Degrees`, true)
            .addField("Feels Like", `${current.feelslike} Degrees`, true)
            .addField("Winds", current.winddisplay, true)
            .addField("Humidity", `${current.humidity}%`, true)
            .setTimestamp();

          message.channel.send({ embeds: [embed] });
        }
      );
    } catch (err) {
      message.reply("An error occured. Please try again.");
    }
  },
};
