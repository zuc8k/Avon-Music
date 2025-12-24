const { OWNERS, ADMINS } = require("../../config");
const subs = require("../../premium/subscriptions");

module.exports = {
  name: "primes",
  async execute(message) {
    if (
      !OWNERS.includes(message.author.id) &&
      !ADMINS.includes(message.author.id)
    ) {
      return message.reply("❌ مش مسموح");
    }

    const data = subs.getAll();
    const entries = Object.entries(data);

    if (!entries.length)
      return message.reply("📭 مفيش اشتراكات");

    const text = entries
      .map(([id, info]) =>
        `🆔 ${id}\n⏳ ينتهي: <t:${Math.floor(info.expiresAt / 1000)}:F>`
      )
      .join("\n\n");

    message.reply(text);
  }
};