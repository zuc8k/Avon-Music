let DEFAULT_VOLUME = 50;

module.exports = {
  name: "defaultvolume",
  async execute(message, args) {
    if (!message.member.permissions.has("Administrator"))
      return message.reply("❌ مش معاك صلاحية");

    const vol = parseInt(args[0]);
    if (isNaN(vol) || vol < 0 || vol > 100)
      return message.reply("❌ من 0 لـ 100");

    DEFAULT_VOLUME = vol;
    message.reply(`🔊 Default Volume = **${vol}%**`);
  }
};