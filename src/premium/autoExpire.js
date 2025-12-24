const subs = require("./subscriptions");

module.exports = (client, interval = 60 * 60 * 1000) => {
  // افتراضي: كل ساعة
  setInterval(() => {
    const data = subs.getAll();
    const now = Date.now();

    for (const [guildId, info] of Object.entries(data)) {
      if (info.expiresAt <= now) {
        subs.removePrime(guildId);

        console.log(
          `❌ Prime expired for guild ${guildId}`
        );
      }
    }
  }, interval);
};