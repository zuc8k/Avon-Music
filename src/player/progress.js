function formatBar(current, total, size = 20) {
  if (!total || total === 0) return "─".repeat(size);

  const progress = Math.round((current / total) * size);
  const empty = size - progress;

  return "▬".repeat(progress) + "🔘" + "─".repeat(empty);
}

function msToTime(ms) {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

module.exports = {
  formatBar,
  msToTime
};