module.exports = {
  name: "autoplay",
  async execute(message, args, client) {
    const queue = client.player.nodes.get(message.guild.id);
    if (!queue) return message.reply("❌ مفيش ميوزك شغالة");

    queue.setAutoPlay(!queue.autoPlay);
    message.reply(`🔁 Autoplay: **${queue.autoPlay ? "On" : "Off"}**`);
  }
};