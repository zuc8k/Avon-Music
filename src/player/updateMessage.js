const { EmbedBuilder } = require("discord.js");
const { panels } = require("./state");

module.exports = async (client, queue, track = null) => {
  const panel = panels.get(queue.guild.id);
  if (!panel) return;

  const channel = await client.channels.fetch(panel.channelId).catch(() => null);
  if (!channel) return;

  const message = await channel.messages.fetch(panel.messageId).catch(() => null);
  if (!message) return;

  let embed;

  if (!track) {
    embed = new EmbedBuilder()
      .setColor(0x2b2d31)
      .setTitle("🎵 Now Playing")
      .setDescription("لا يوجد تشغيل حاليًا\nاستخدم /play أو !play")
      .setFooter({ text: "Music Control Panel" });
  } else {
    embed = new EmbedBuilder()
      .setColor(0x2b2d31)
      .setTitle("🎶 Now Playing")
      .setDescription(`**${track.title}**`)
      .addFields(
        { name: "⏱️ Duration", value: track.duration, inline: true },
        { name: "👤 Requested by", value: track.requestedBy.username, inline: true }
      )
      .setThumbnail(track.thumbnail)
      .setFooter({ text: `Volume: ${queue.node.volume}% | Loop: ${queue.repeatMode ? "On" : "Off"}` });
  }

  await message.edit({ embeds: [embed] });
};