const { Client, ContextMenuInteraction  } = require("discord.js");

module.exports = {
    name: "sus",
    type: 'MESSAGE',
    /**
     *
     * @param {Client} client
     * @param {ContextMenuInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
      const msg = await interaction.channel.messages.fetch(
        interaction.targetId
      );

      interaction.followUp({
         content: `https://tenor.com/view/among-us-sus-sus-sus-among-sus-sussy-kleb-gif-21479875`,
      });
    },
};