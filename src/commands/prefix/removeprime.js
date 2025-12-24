const { OWNERS } = require("../../config");
const subs = require("../../premium/subscriptions");

module.exports = {
  name: "removeprime",
  async execute(message, args) {
    if (!OWNERS.includes(message.author.id))
      return message.reply("❌ الأمر ده للأونر فقط");

    const guildId = args[0];
    if (!guildId)
      return message.reply("❌ اكتب Server ID");

    subs.removePrime(guildId);
    message.reply("🗑️ تم إنهاء اشتراك Prime");
  }
};