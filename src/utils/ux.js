const { EmbedBuilder } = require("discord.js");

const COLORS = {
  success: 0x57F287,
  error: 0xED4245,
  info: 0x5865F2
};

module.exports = {
  success(text) {
    return new EmbedBuilder()
      .setColor(COLORS.success)
      .setDescription(`✅ ${text}`);
  },

  error(text) {
    return new EmbedBuilder()
      .setColor(COLORS.error)
      .setDescription(`❌ ${text}`);
  },

  info(text) {
    return new EmbedBuilder()
      .setColor(COLORS.info)
      .setDescription(text);
  }
};