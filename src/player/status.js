module.exports = (queue) => {
  if (!queue) return "⏹️ Stopped";
  if (queue.node.isPaused()) return "⏸️ Paused";
  return "▶️ Playing";
};