const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

const { formatBar } = require("./progress");

function createNowPlayingEmbed(track, queue) {
  const embed = new EmbedBuilder()
    .setColor(0x2b2d31)
    .setFooter({ text: "Music Control Panel" });

  if (!track || !queue) {
    return embed
      .setTitle("🎵 Now Playing")
      .setDescription("لا يوجد تشغيل حاليًا\nاستخدم /play أو !play");
  }

  const current = queue.node.getTimestamp()?.current?.value || 0;
  const total = queue.node.getTimestamp()?.total?.value || 0;

  embed
    .setTitle("🎶 Now Playing")
    .setDescription(`**${track.title}**`)
    .setThumbnail(track.thumbnail)
    .addFields(
      {
        name: "⏱️ Duration",
        value: track.duration,
        inline: true
      },
      {
        name: "👤 Requested by",
        value: track.requestedBy.username,
        inline: true
      },
      {
        name: "▶ Progress",
        value: formatBar(current, total),
        inline: false
      }
    )
    .setFooter({
      text: `Volume: ${queue.node.volume}% | Loop: ${queue.repeatMode ? "On" : "Off"}`
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