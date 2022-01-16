const discord = require("discord.js");
require("dotenv").config();
const { Client, Collection } = require("discord.js");
const economy = require("discord-bot-eco");
const xp = require("simply-xp");

const client = new Client({
  intents: 32767,
});

module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

// XP And Economy setup
economy.setURL(process.env.MONGOURI);
xp.connect(process.env.MONGOURI);

require("./dir/handler")(client);

client.login(process.env.TOKEN);
