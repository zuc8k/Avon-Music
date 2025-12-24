const client = require("./client");
const { token } = require("./config");

// Handlers
require("./handlers/slashHandler")(client);
require("./handlers/prefixHandler")(client);
require("./handlers/interactionHandler")(client);
require("./handlers/buttonHandler")(client);

// Player Events
require("./player/events")(client);

// Auto UI Update (Progress Bar)
require("./player/autoUpdate")(client);

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.login(token);