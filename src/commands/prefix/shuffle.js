module.exports = {
  name: "shuffle",
  async execute(message, args, client) {
    const queue = client.player.nodes.get(message.guild.id);
    if (!queue) return message.reply("❌ مفيش ميوزك شغالة");

    queue.tracks.shuffle();
    message.reply("🔀 تم خلط الكيو");
  }
};