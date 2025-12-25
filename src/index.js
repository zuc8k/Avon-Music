const client = require("./client");
const { token } = require("./config");

require("./handlers/slashHandler")(client);
require("./handlers/prefixHandler")(client);
require("./handlers/interactionHandler")(client);
require("./handlers/buttonHandler")(client);
require("./handlers/helpMenuHandler")(client);

require("./player/events")(client);
require("./player/autoUpdate")(client);
require("./premium/autoExpire")(client);

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.login(token);
