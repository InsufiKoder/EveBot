const client = require("../../index");
const { MessageEmbed } = require("discord.js");
const xp = require("simply-xp");

client.on("levelUp", async (message, data) => {
  const levelembed = new MessageEmbed()
    .setColor("RANDOM")
    .setTitle("Level up!")
    .setDescription(
      `Congratulations, ${message.author}! You are now ***level ${data.level}***.`
    )
    .setTimestamp();

  message.reply({ embeds: [levelembed] }).then((message) => {
    setTimeout(() => message.delete(), 2500);
  });
});
