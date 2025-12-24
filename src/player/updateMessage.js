const panelState = require("./state");
const { createNowPlayingEmbed } = require("./panel");

/**
 * Update the persistent music control panel message
 * @param {Client} client
 * @param {Queue} queue
 * @param {Track|null} track
 */
module.exports = async (client, queue, track = null) => {
  if (!queue || !queue.guild) return;

  const panel = panelState.get(queue.guild.id);
  if (!panel) return;

  let channel;
  try {
    channel = await client.channels.fetch(panel.channelId);
  } catch {
    return;
  }

  if (!channel || !channel.isTextBased()) return;

  let message;
  try {
    message = await channel.messages.fetch(panel.messageId);
  } catch {
    return;
  }

  if (!message) return;

  const embed = createNowPlayingEmbed(track, queue);

  try {
    await message.edit({
      embeds: [embed]
    });
  } catch (err) {
    console.error("Failed to update music panel:", err);
  }
};