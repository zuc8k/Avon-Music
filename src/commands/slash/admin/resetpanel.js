const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const panelState = require("../../../player/state");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resetpanel")
    .setDescription("Remove music control panel")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const panel = panelState.get(interaction.guild.id);
    if (!panel)
      return interaction.reply({ content: "❌ مفيش Panel", ephemeral: true });

    try {
      const channel = await interaction.client.channels.fetch(panel.channelId);
      const message = await channel.messages.fetch(panel.messageId);
      await message.delete();
    } catch {}

    panelState.delete(interaction.guild.id);
    interaction.reply("🗑️ تم حذف لوحة التحكم");
  }
};