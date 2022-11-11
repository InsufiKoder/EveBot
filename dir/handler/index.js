const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");

const globPromise = promisify(glob);

/**
 * @param {Client} client
 */
module.exports = async (client) => {
  // Chat Commands
  const commandFiles = await globPromise(
    `${process.cwd()}/dir/commands/**/*.js`
  );
  commandFiles.map((value) => {
    const file = require(value);
    const splitted = value.split("/");
    const directory = splitted[splitted.length - 2];

    if (file.name) {
      const properties = { directory, ...file };
      client.commands.set(file.name, properties);
      console.log(`Loaded ${file.name}`);
    }
  });

  // Events
  const eventFiles = await globPromise(`${process.cwd()}/dir/events/*.js`);
  eventFiles.map((value) => require(value));

  // Slash Commands
  const slashCommands = await globPromise(
    `${process.cwd()}/dir/SlashCommands/*/*.js`
  );

  const arrayOfSlashCommands = [];
  slashCommands.map((value) => {
    const file = require(value);
    if (!file?.name) return;
    client.SlashCommands.set(file.name, file);

    if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
    if (file.userPermissions) file.defaultPermission = false;

    arrayOfSlashCommands.push(file);
  });

  client.on("ready", async () => {
    // Register for a guild only
    const guild = client.guilds.cache.get(client.config.guildid);
    if (!guild)
      return console.log(
        "Unable to register guild commands. No guild id given."
      );

    // Register Globally
    await client.application.commands.set(arrayOfSlashCommands);
  });
};
