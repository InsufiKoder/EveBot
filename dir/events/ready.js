const client = require("../..");
const cmddir = [...new Set(client.commands.map((cmd) => cmd.directory))];

client.on("ready", () => {
  client.user.setActivity(`Coded By @UnusefulCoder#0001`, { type: "PLAYING" });

  console.log("Command Directories: ", cmddir);
  console.log(`${client.user.tag} Is Online`);
});
