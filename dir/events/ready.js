const client = require("../..");
const cmddir = [...new Set(client.commands.map((cmd) => cmd.directory))];
const economy = require("discord-bot-eco");
const xp = require("simply-xp");

client.on("ready", () => {
  client.user.setActivity(`Coded By @UnusefulCoder#0001`, { type: "PLAYING" });

  // XP And Economy setup
  economy.setURL(process.env.MONGOURI);
  xp.connect(process.env.MONGOURI);

  console.log("Command Directories: ", cmddir);
  console.log(`${client.user.tag} Is Online`);
});
