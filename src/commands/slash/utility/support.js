const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("support")
    .setDescription("Get support server link"),

  async execute(interaction) {
    const supportLink = "https://discord.gg/PUT_SUPPORT_SERVER";

    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setTitle("🛠️ Support Server")
      .setDescription(
        "[اضغط هنا للدخول لسيرفر الدعم](" + supportLink + ")"
      )
      .setFooter({ text: "Music Bot • Support" });

    interaction.reply({ embeds: [embed] });
  }
};