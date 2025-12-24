module.exports = {
  name: "setprefix",
  async execute(message, args) {
    if (!message.member.permissions.has("Administrator"))
      return message.reply("❌ مش معاك صلاحية");

    const prefix = args[0];
    if (!prefix) return message.reply("❌ اكتب Prefix");

    message.reply(
      `⚠️ Prefix تم تغييره إلى **${prefix}** (Restart مطلوب)`
    );
  }
};