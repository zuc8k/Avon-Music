const { OWNERS } = require("../../config");
const subs = require("../../premium/subscriptions");

module.exports = {
  name: "addprime",
  async execute(message, args) {
    if (!OWNERS.includes(message.author.id))
      return message.reply("❌ الأمر ده للأونر فقط");

    const guildId = args[0];
    const days = parseInt(args[1]);

    if (!guildId || !days)
      return message.reply("❌ الاستخدام: !addprime <ServerID> <Days>");

    const expiresAt = Date.now() + days * 24 * 60 * 60 * 1000;
    subs.addPrime(guildId, expiresAt);

    message.reply(
      `✅ تم إضافة Prime للسيرفر\n🗓️ ينتهي في: <t:${Math.floor(
        expiresAt / 1000
      )}:F>`
    );
  }
};