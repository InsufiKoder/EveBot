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
    client.slashCommands.set(file.name, file);

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
    await guild.commands.set(arrayOfSlashCommands).then((cmd) => {
      const getRoles = (commandNames) => {
        const permissions = arrayOfSlashCommands.find(
          (x) => x.name === commandNames
        ).userPermissions;

        if (!permissions) return null;
        return guild.roles.cache.filter(
          (x) => x.permissions.has(permissions) && !x.managed
        );
      };

      const fullPermissions = cmd.reduce((accumulator, x) => {
        const roles = getRoles(x.name);
        if (!roles) return accumulator;

        const permissions = roles.reduce((a, v) => {
          return [
            ...a,
            {
              id: v.id,
              type: "ROLE",
              permission: true,
            },
          ];
        }, []);

        return [
          ...accumulator,
          {
            id: x.id,
            permissions,
          },
        ];
      }, []);

      guild.commands.permissions.set({ fullPermissions });
    });

    // Register Globally
    await client.application.commands.set(arrayOfSlashCommands);
  });
};
