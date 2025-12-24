const client = require("./client");
const { token } = require("./config");

// Handlers
require("./handlers/slashHandler")(client);
require("./handlers/prefixHandler")(client);
require("./handlers/interactionHandler")(client);
require("./handlers/buttonHandler")(client);
require("./handlers/helpMenuHandler")(client);

// Player Events
require("./player/events")(client);

// UI Auto Update
require("./player/autoUpdate")(client);

// Prime Auto Expire
require("./premium/autoExpire")(client);

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.login(token);