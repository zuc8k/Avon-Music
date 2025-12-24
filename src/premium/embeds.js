const { EmbedBuilder } = require("discord.js");

const COLOR = 0xF1C40F; // ذهبي

module.exports = {
  added(guildName, expiresAt) {
    return new EmbedBuilder()
      .setColor(COLOR)
      .setTitle("💎 Prime Activated")
      .setDescription(`تم تفعيل Prime للسيرفر:`)
      .addFields(
        { name: "🏷️ Server", value: guildName, inline: true },
        {
          name: "⏳ Expiration",
          value: `<t:${Math.floor(expiresAt / 1000)}:F>`,
          inline: true
        }
      )
      .setFooter({ text: "Prime System" })
      .setTimestamp();
  },

  removed(guildId) {
    return new EmbedBuilder()
      .setColor(0xE74C3C)
      .setTitle("🗑️ Prime Removed")
      .setDescription("تم إنهاء اشتراك Prime")
      .addFields({
        name: "🆔 Server ID",
        value: guildId
      })
      .setFooter({ text: "Prime System" })
      .setTimestamp();
  },

  list(entries) {
    const desc = entries.length
      ? entries
          .map(
            ([id, info]) =>
              `🆔 **${id}**\n⏳ <t:${Math.floor(
                info.expiresAt / 1000
              )}:F>`
          )
          .join("\n\n")
      : "📭 لا يوجد اشتراكات";

    return new EmbedBuilder()
      .setColor(COLOR)
      .setTitle("💎 Prime Subscriptions")
      .setDescription(desc)
      .setFooter({ text: "Prime System" })
      .setTimestamp();
  }
};