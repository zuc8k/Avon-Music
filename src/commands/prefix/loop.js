const ux = require("../../utils/ux");

module.exports = {
  name: "loop",
  async execute(message, args, client) {
    const queue = client.player.nodes.get(message.guild.id);
    if (!queue) return message.reply({ embeds: [ux.error("مفيش ميوزك شغالة")] });

    const map = { off: 0, track: 1, queue: 2 };
    const mode = args[0];
    if (!map.hasOwnProperty(mode))
      return message.reply({ embeds: [ux.error("استخدم: off / track / queue")] });

    queue.setRepeatMode(map[mode]);
    message.reply({ embeds: [ux.success(`Loop: **${mode}** 🔁`)] });
  }
};