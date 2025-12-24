function ensureQueue(queue, interaction) {
  if (!queue) {
    interaction.reply({
      content: "❌ مفيش ميوزك شغالة",
      ephemeral: true
    });
    return false;
  }
  return true;
}

module.exports = {
  pause(queue) {
    queue.node.isPaused() ? queue.node.resume() : queue.node.pause();
  },

  skip(queue) {
    queue.node.skip();
  },

  stop(queue) {
    queue.delete();
  },

  back(queue) {
    queue.history.back();
  },

  loop(queue) {
    queue.setRepeatMode(queue.repeatMode === 0 ? 1 : 0);
  },

  shuffle(queue) {
    queue.tracks.shuffle();
  },

  volUp(queue) {
    queue.node.setVolume(Math.min(queue.node.volume + 10, 100));
  },

  volDown(queue) {
    queue.node.setVolume(Math.max(queue.node.volume - 10, 0));
  },

  ensureQueue
};