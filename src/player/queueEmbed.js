const { EmbedBuilder } = require("discord.js");

module.exports = (queue) => {
  if (!queue || !queue.tracks.length) {
    return new EmbedBuilder()
      .setColor(0x2b2d31)
      .setDescription("📭 الـ Queue فاضية");
  }

  const tracks = queue.tracks.toArray().slice(0, 10);

  const description = tracks
    .map((t, i) => `**${i + 1}.** ${t.title} \`[${t.duration}]\``)
    .join("\n");

  return new EmbedBuilder()
    .setColor(0x2b2d31)
    .setTitle("📜 Queue")
    .setDescription(description)
    .setFooter({
      text: `Total Tracks: ${queue.tracks.length}`
    });
};