const { EmbedBuilder } = require("discord.js");

module.exports = (queue, page = 0, perPage = 5) => {
  const tracks = queue.tracks.toArray();
  const start = page * perPage;
  const sliced = tracks.slice(start, start + perPage);

  const desc = sliced
    .map((t, i) => `**${start + i + 1}.** ${t.title} \`[${t.duration}]\``)
    .join("\n") || "📭 لا يوجد عناصر";

  return new EmbedBuilder()
    .setColor(0x5865F2)
    .setTitle("📜 Queue")
    .setDescription(desc)
    .setFooter({
      text: `Page ${page + 1} / ${Math.max(1, Math.ceil(tracks.length / perPage))}`
    });
};