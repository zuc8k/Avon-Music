const updateMessage = require("./updateMessage");

module.exports = (client, interval = 15000) => {
  setInterval(() => {
    client.guilds.cache.forEach(guild => {
      const queue = client.player.nodes.get(guild.id);
      if (queue && queue.currentTrack) {
        updateMessage(client, queue, queue.currentTrack);
      }
    });
  }, interval);
};