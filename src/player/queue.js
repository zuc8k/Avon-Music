function getQueue(client, guildId) {
  try {
    return client.player.nodes.get(guildId) || null;
  } catch {
    return null;
  }
}

function hasQueue(client, guildId) {
  return !!getQueue(client, guildId);
}

module.exports = {
  getQueue,
  hasQueue
};