module.exports = {
  name: "seek",
  async execute(message, args, client) {
    const queue = client.player.nodes.get(message.guild.id);
    if (!queue) return message.reply("❌ مفيش ميوزك شغالة");

    const sec = parseInt(args[0]);
    if (isNaN(sec)) return message.reply("❌ اكتب ثواني");

    queue.node.seek(sec * 1000);
    message.reply(`⏩ تم التقديم إلى ${sec}s`);
  }
};