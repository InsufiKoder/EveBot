const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "purge",
  description: "Clears specified amount of messages.",
  permissions: ["MANAGE_MESSAGES"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      const amount = parseInt(args[0]);

      if (!amount)
        return message.reply(
          "Please specify the amount of messages you want me to delete"
        );
      if (amount > 100 || amount < 1)
        return message.reply("Please select a number *between* 100 and 1");

      message.channel.bulkDelete(amount).catch((err) => {
        message.reply(
          ":x: Due to Discord Limitations, I cannot delete messages older than 14 days"
        );
      });

      const msg = await message.reply(`Deleted \`${amount}\` messages`);
      setTimeout(() => {
        msg.delete();
      }, 2000);
    } catch (err) {
      message.reply("An error occured. Please try again.");
    }
  },
};
