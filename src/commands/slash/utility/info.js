const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Bot information"),

  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setTitle("ℹ️ Bot Info")
      .addFields(
        { name: "🆔 Bot ID", value: client.user.id, inline: true },
        { name: "🌐 Servers", value: `${client.guilds.cache.size}`, inline: true },
        { name: "⏱️ Uptime", value: `<t:${Math.floor((Date.now() - client.uptime) / 1000)}:R>`, inline: false }
      )
      .setFooter({ text: "Music Bot • Info" });

    interaction.reply({ embeds: [embed] });
  }
};