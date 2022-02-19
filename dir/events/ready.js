const client = require("../..");
const cmddir = [...new Set(client.commands.map((cmd) => cmd.directory))];
require("dotenv").config();
const economy = require("discord-bot-eco");
const xp = require("simply-xp");

const activities = [
  { name: "Coded by UnusefulCoder#0001", type: "PLAYING" },
  { name: "-help", type: "LISTENING" },
  { name: "Users", type: "LISTENING" },
  {
    name: "This one will not appear in bot's status. Weird, right?",
    type: "PLAYING",
  },
];

client.on("ready", () => {
  client.user.setPresence({ status: "online", activity: activities[0] });
  let activity = 1;
  setInterval(() => {
    activities[2] = {
      name: `${client.channels.cache.size} Channels`,
      type: "WATCHING",
    };
    activities[3] = {
      name: `${client.users.cache.size} Users`,
      type: "WATCHING",
    };
    if (activity > 3) activity = 0;
    client.user.setActivity(activities[activity]);
    activity++;
  }, 5000);

  xp.connect(process.env.MONGOURI);

  console.log("Command Directories: ", cmddir);
  console.log(`${client.user.tag} Is Online`);
});
