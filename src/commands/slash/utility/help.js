const {
  SlashCommandBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Show help menu"),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setTitle("📖 Help Menu")
      .setDescription("اختار قسم من القائمة 👇");

    const menu = new StringSelectMenuBuilder()
      .setCustomId("help_menu")
      .setPlaceholder("Select Category")
      .addOptions([
        { label: "Music", value: "music", emoji: "🎵" },
        { label: "Admin", value: "admin", emoji: "🛠️" },
        { label: "Utility", value: "utility", emoji: "⚙️" }
      ]);

    const row = new ActionRowBuilder().addComponents(menu);

    interaction.reply({
      embeds: [embed],
      components: [row],
      ephemeral: true
    });
  }
};