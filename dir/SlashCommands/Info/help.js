const { MessageEmbed, CommandInteraction } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
  name: "help",
  description: "Shows all of the current slash commands.",
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    let categories = [];

    readdirSync("./dir/SlashCommands/").forEach((dir) => {
      const commands = readdirSync(`./dir/SlashCommands/${dir}/`).filter(
        (file) => file.endsWith(".js")
      );

      const cmds = commands.map((command) => {
        let file = require(`../../SlashCommands/${dir}/${command}`);

        if (!file.name) return "No command name.";

        let name = file.name.replace(".js", "");

        return `\`${name}\``;
      });

      let data = new Object();

      data = {
        name: dir,
        value: cmds.length === 0 ? "In progress." : cmds.join(" "),
      };

      categories.push(data);
    });

    const replyEmbed = new MessageEmbed()
      .setTitle("📬 Need help? Here are all of my commands:")
      .addFields(categories)
      .setFooter({
        text: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp()
      .setColor("RANDOM");

    interaction.followUp({ embeds: [replyEmbed] });
  },
};
