module.exports = {
  name: "loop",
  async execute(message, args, client) {
    const queue = client.player.nodes.get(message.guild.id);
    if (!queue) return message.reply("❌ مفيش ميوزك شغالة");

    const mode = args[0];
    const map = { off: 0, track: 1, queue: 2 };
    if (!map.hasOwnProperty(mode))
      return message.reply("❌ استخدم: off / track / queue");

    queue.setRepeatMode(map[mode]);
    message.reply(`🔁 Loop: **${mode}**`);
  }
};