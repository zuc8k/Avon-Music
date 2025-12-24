const updateMessage = require("./updateMessage");

module.exports = (client) => {

  client.player.events.on("playerStart", (queue, track) => {
    updateMessage(client, queue, track);
  });

  client.player.events.on("emptyQueue", (queue) => {
    updateMessage(client, queue, null);
  });

  client.player.events.on("disconnect", (queue) => {
    updateMessage(client, queue, null);
  });

};