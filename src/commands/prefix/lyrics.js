module.exports = {
  name: "lyrics",
  async execute(message, args, client) {
    const queue = client.player.nodes.get(message.guild.id);
    if (!queue || !queue.currentTrack)
      return message.reply("❌ مفيش أغنية شغالة");

    const lyrics = await queue.currentTrack.lyrics();
    if (!lyrics) return message.reply("❌ مش لاقي كلمات");

    message.reply(lyrics.slice(0, 2000));
  }
};