const ux = require("../../utils/ux");

module.exports = {
  name: "stop",
  async execute(message, args, client) {
    const queue = client.player.nodes.get(message.guild.id);
    if (queue) queue.delete();

    message.reply({ embeds: [ux.success("تم إيقاف الميوزك ⏹️")] });
  }
};