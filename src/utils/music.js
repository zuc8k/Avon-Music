async function getOrCreateQueue(client, guild, channel) {
  const queue = client.player.nodes.create(guild, {
    metadata: channel
  });
  return queue;
}

module.exports = { getOrCreateQueue };