module.exports = (client) => {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isButton()) return;

    const queue = client.player.nodes.get(interaction.guild.id);

    if (!queue && interaction.customId !== "music_stop") {
      return interaction.reply({
        content: "❌ مفيش ميوزك شغالة",
        ephemeral: true
      });
    }

    try {
      switch (interaction.customId) {

        case "music_pause":
          if (queue.node.isPaused()) {
            queue.node.resume();
          } else {
            queue.node.pause();
          }
          break;

        case "music_skip":
          queue.node.skip();
          break;

        case "music_stop":
          if (queue) queue.delete();
          break;

        case "music_back":
          queue.history.back();
          break;

        case "music_loop":
          queue.setRepeatMode(
            queue.repeatMode === 0 ? 1 : 0
          );
          break;

        case "music_shuffle":
          queue.tracks.shuffle();
          break;

        case "music_vol_up":
          queue.node.setVolume(
            Math.min(queue.node.volume + 10, 100)
          );
          break;

        case "music_vol_down":
          queue.node.setVolume(
            Math.max(queue.node.volume - 10, 0)
          );
          break;

        default:
          return;
      }

      await interaction.deferUpdate();

    } catch (err) {
      console.error(err);
      interaction.reply({
        content: "❌ حصل خطأ",
        ephemeral: true
      });
    }
  });
};