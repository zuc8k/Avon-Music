const fs = require("fs");
const path = require("path");
const config = require("../config");

module.exports = (client) => {
  client.prefixCommands = new Map();

  const commandsPath = path.join(__dirname, "../commands/prefix");
  if (!fs.existsSync(commandsPath)) return;

  const files = fs.readdirSync(commandsPath).filter(f => f.endsWith(".js"));

  for (const file of files) {
    const command = require(path.join(commandsPath, file));
    if (command.name) {
      client.prefixCommands.set(command.name, command);
    }
  }

  client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.PREFIX)) return;

    const args = message.content.slice(config.PREFIX.length).trim().split(/ +/);
    const name = args.shift().toLowerCase();

    const command = client.prefixCommands.get(name);
    if (!command) return;

    try {
      await command.execute(message, args, client);
    } catch (err) {
      console.error(err);
      message.reply("❌ حصل خطأ");
    }
  });

  console.log(`✅ Loaded ${client.prefixCommands.size} prefix commands`);
};
