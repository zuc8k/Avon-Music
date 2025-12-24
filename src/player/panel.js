const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

const { formatBar } = require("./progress");
const getStatus = require("./status");

function createNowPlayingEmbed(track, queue) {
  const embed = new EmbedBuilder()
    .setColor(0x5865F2)
    .setFooter({ text: "Music Control Panel" });

  if (!track || !queue) {
    return embed
      .setTitle("🎵 Now Playing")
      .setDescription("لا يوجد تشغيل حاليًا\nاستخدم /play أو !play");
  }

  const timestamp = queue.node.getTimestamp();
  const current = timestamp?.current?.value || 0;
  const total = timestamp?.total?.value || 0;

  embed
    .setTitle(`${getStatus(queue)} | Now Playing`)
    .setDescription(`🎧 **${track.title}**`)
    .setThumbnail(track.thumbnail)
    .addFields(
      { name: "⏱️ المدة", value: track.duration, inline: true },
      { name: "👤 بواسطة", value: track.requestedBy.username, inline: true },
      { name: "📊 التقدم", value: formatBar(current, total), inline: false }
    )
    .setFooter({
      text: `🔊 ${queue.node.volume}% | 🔁 ${queue.repeatMode ? "On" : "Off"}`
    });

  return embed;
}

function createControlButtons() {
  const row1 = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("music_back").setEmoji("⏮️").setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId("music_pause").setEmoji("⏯️").setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId("music_skip").setEmoji("⏭️").setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId("music_stop").setEmoji("⏹️").setStyle(ButtonStyle.Danger),
    new ButtonBuilder().setCustomId("music_loop").setEmoji("🔁").setStyle(ButtonStyle.Secondary)
  );

  const row2 = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("music_shuffle").setEmoji("🔀").setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId("music_vol_down").setEmoji("🔉").setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId("music_vol_up").setEmoji("🔊").setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId("music_queue").setEmoji("📜").setStyle(ButtonStyle.Secondary)
  );

  return [row1, row2];
}

module.exports = {
  createNowPlayingEmbed,
  createControlButtons
};