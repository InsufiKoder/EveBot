require("dotenv").config();
const { Client, Collection } = require("discord.js");

const client = new Client({
  intents: 32767,
});

module.exports = client;

// Global Variables
client.commands = new Collection();
client.SlashCommands = new Collection();
client.config = require("./config.json");
client.emotes = client.config.emoji;

require("./dir/handler")(client);

client.login(process.env.TOKEN);
