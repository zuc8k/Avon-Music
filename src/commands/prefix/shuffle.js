const ux = require("../../utils/ux");

module.exports = {
  name: "shuffle",
  async execute(message, args, client) {
    const queue = client.player.nodes.get(message.guild.id);
    if (!queue) return message.reply({ embeds: [ux.error("مفيش ميوزك شغالة")] });

    queue.tracks.shuffle();
    message.reply({ embeds: [ux.success("تم خلط الكيو 🔀")] });
  }
};