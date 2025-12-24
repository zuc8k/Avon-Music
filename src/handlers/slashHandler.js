const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  client.slashCommands = new Map();

  const commandsPath = path.join(__dirname, "../commands/slash");
  if (!fs.existsSync(commandsPath)) return;

  const loadCommands = (dir) => {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const fullPath = path.join(dir, file);

      if (fs.statSync(fullPath).isDirectory()) {
        loadCommands(fullPath);
      } else if (file.endsWith(".js")) {
        const command = require(fullPath);
        if (command.data && command.execute) {
          client.slashCommands.set(command.data.name, command);
        }
      }
    }
  };

  loadCommands(commandsPath);

  console.log(`✅ Loaded ${client.slashCommands.size} slash commands`);
};
