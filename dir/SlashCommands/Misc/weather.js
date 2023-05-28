const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const weather = require("weather-js");

module.exports = {
  name: "weather",
  description: "Returns the weather on provided location.",
  options: [
    {
      name: "location",
      description: "The location to check weather of",
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
    weather.find(
      { search: interaction.options.getString("location"), degreeType: "C" },
      function (err, result) {
        if (result.length === 0)
          return interaction.followUp("Please enter a valid location.");

        var current = result[0].current;
        var location = result[0].location;

        let replyEmbed = new MessageEmbed()
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
          .setTimestamp()
          .setFooter({
            text: interaction.user.tag,
            iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
          });

        interaction.followUp({ embeds: [replyEmbed] });
      }
    );
  },
};
