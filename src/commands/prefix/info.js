const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "info",
  async execute(message, args, client) {
    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setTitle("ℹ️ Bot Info")
      .addFields(
        { name: "🆔 Bot ID", value: client.user.id, inline: true },
        { name: "🌐 Servers", value: `${client.guilds.cache.size}`, inline: true },
        {
          name: "⏱️ Uptime",
          value: `<t:${Math.floor((Date.now() - client.uptime) / 1000)}:R>`,
          inline: false
        }
      )
      .setFooter({ text: "Music Bot • Info" });

    message.reply({ embeds: [embed] });
  }
};