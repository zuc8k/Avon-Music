const ux = require("../utils/ux");
const queueEmbed = require("../player/queueEmbed");
const controls = require("../player/controls");

module.exports = (client) => {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isButton()) return;

    const queue = client.player.nodes.get(interaction.guild.id);

    // زر Queue
    if (interaction.customId === "music_queue") {
      if (!queue) {
        return interaction.reply({
          embeds: [ux.info("📭 الكيو فاضية")],
          ephemeral: true
        });
      }

      return interaction.reply({
        embeds: [queueEmbed(queue)],
        ephemeral: true
      });
    }

    // باقي الأزرار
    if (!queue) {
      return interaction.reply({
        embeds: [ux.error("مفيش ميوزك شغالة")],
        ephemeral: true
      });
    }

    try {
      switch (interaction.customId) {
        case "music_pause":
          queue.node.isPaused()
            ? queue.node.resume()
            : queue.node.pause();
          return interaction.reply({
            embeds: [
              ux.success(
                queue.node.isPaused()
                  ? "تم الإيقاف المؤقت ⏸️"
                  : "كملت التشغيل ▶️"
              )
            ],
            ephemeral: true
          });

        case "music_skip":
          queue.node.skip();
          return interaction.reply({
            embeds: [ux.success("تم تخطي الأغنية ⏭️")],
            ephemeral: true
          });

        case "music_stop":
          queue.delete();
          return interaction.reply({
            embeds: [ux.success("تم إيقاف الميوزك ⏹️")],
            ephemeral: true
          });

        case "music_back":
          queue.history.back();
          return interaction.reply({
            embeds: [ux.success("رجعت للأغنية اللي قبلها ⏮️")],
            ephemeral: true
          });

        case "music_loop":
          queue.setRepeatMode(queue.repeatMode === 0 ? 1 : 0);
          return interaction.reply({
            embeds: [
              ux.success(
                queue.repeatMode ? "Loop شغال 🔁" : "Loop اتقفل"
              )
            ],
            ephemeral: true
          });

        case "music_shuffle":
          queue.tracks.shuffle();
          return interaction.reply({
            embeds: [ux.success("تم خلط الكيو 🔀")],
            ephemeral: true
          });

        case "music_vol_up":
          queue.node.setVolume(
            Math.min(queue.node.volume + 10, 100)
          );
          return interaction.reply({
            embeds: [ux.success("🔊 زوّدنا الصوت")],
            ephemeral: true
          });

        case "music_vol_down":
          queue.node.setVolume(
            Math.max(queue.node.volume - 10, 0)
          );
          return interaction.reply({
            embeds: [ux.success("🔉 قللنا الصوت")],
            ephemeral: true
          });

        default:
          return;
      }
    } catch (err) {
      console.error(err);
      return interaction.reply({
        embeds: [ux.error("حصل خطأ غير متوقع")],
        ephemeral: true
      });
    }
  });
};