const client = require("../..");

client.on('ready', () => {
    console.log(`${client.user.username} Is Online`);
    client.user.setActivity(`Coded By @UnusefulCoder#3675`, {type : "PLAYING"});
})