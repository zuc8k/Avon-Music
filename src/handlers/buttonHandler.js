const controls = require("../player/controls");

const MAP = {
  music_pause: controls.pause,
  music_skip: controls.skip,
  music_stop: controls.stop,
  music_back: controls.back,
  music_loop: controls.loop,
  music_shuffle: controls.shuffle,
  music_vol_up: controls.volUp,
  music_vol_down: controls.volDown
};

module.exports = (client) => {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isButton()) return;

    const action = MAP[interaction.customId];
    if (!action) return;

    const queue = client.player.nodes.get(interaction.guild.id);

    if (!controls.ensureQueue(queue, interaction)) return;

    try {
      action(queue);
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