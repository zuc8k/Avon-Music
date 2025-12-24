const ux = require("../../utils/ux");

module.exports = {
  name: "pause",
  async execute(message, args, client) {
    const queue = client.player.nodes.get(message.guild.id);
    if (!queue) return message.reply({ embeds: [ux.error("مفيش ميوزك شغالة")] });

    queue.node.pause();
    message.reply({ embeds: [ux.success("تم الإيقاف المؤقت ⏸️")] });
  }
};