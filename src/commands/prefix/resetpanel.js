const panelState = require("../../player/state");

module.exports = {
  name: "resetpanel",
  async execute(message) {
    if (!message.member.permissions.has("Administrator"))
      return message.reply("❌ مش معاك صلاحية");

    const panel = panelState.get(message.guild.id);
    if (!panel) return message.reply("❌ مفيش Panel");

    try {
      const channel = await message.client.channels.fetch(panel.channelId);
      const msg = await channel.messages.fetch(panel.messageId);
      await msg.delete();
    } catch {}

    panelState.delete(message.guild.id);
    message.reply("🗑️ تم حذف لوحة التحكم");
  }
};