const {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder
} = require("discord.js");

module.exports = {
  name: "help",
  async execute(message) {
    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setTitle("📖 Help Menu")
      .setDescription(
        "أهلاً بيك 👋\n" +
        "اختار قسم من القائمة تحت علشان تشوف الأوامر 👇"
      )
      .setFooter({ text: "Music Bot • Help" });

    const menu = new StringSelectMenuBuilder()
      .setCustomId("help_menu")
      .setPlaceholder("📂 اختر قسم")
      .addOptions([
        {
          label: "Music Commands",
          value: "music",
          description: "تشغيل والتحكم في الميوزك",
          emoji: "🎵"
        },
        {
          label: "Admin Commands",
          value: "admin",
          description: "إعدادات وتحكم الأدمن",
          emoji: "🛠️"
        },
        {
          label: "Utility Commands",
          value: "utility",
          description: "أوامر عامة ومساعدة",
          emoji: "⚙️"
        }
      ]);

    const row = new ActionRowBuilder().addComponents(menu);

    message.reply({
      embeds: [embed],
      components: [row]
    });
  }
};