const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

function baseEmbed() {
  return new EmbedBuilder()
    .setColor(0x2b2d31)
    .setFooter({ text: "Music Control Panel" });
}

function createNowPlayingEmbed(track, queue) {
  if (!track) {
    return baseEmbed()
      .setTitle("🎵 Now Playing")
      .setDescription("لا يوجد تشغيل حاليًا\nاستخدم /play أو !play");
  }

  return baseEmbed()
    .setTitle("🎶 Now Playing")
    .setDescription(`**${track.title}**`)
    .addFields(
      { name: "⏱️ Duration", value: track.duration, inline: true },
      { name: "👤 Requested by", value: track.requestedBy.username, inline: true }
    )
    .setThumbnail(track.thumbnail)
    .setFooter({
      text: `Volume: ${queue.node.volume}% | Loop: ${queue.repeatMode ? "On" : "Off"}`
    });
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
    new ButtonBuilder().setCustomId("music_vol_up").setEmoji("🔊").setStyle(ButtonStyle.Secondary)
  );

  return [row1, row2];
}

module.exports = {
  createNowPlayingEmbed,
  createControlButtons
};