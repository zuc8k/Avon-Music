const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "support",
  async execute(message) {
    const supportLink = "https://discord.gg/PUT_SUPPORT_SERVER";

    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setTitle("🛠️ Support Server")
      .setDescription(
        "[اضغط هنا للدخول لسيرفر الدعم](" + supportLink + ")"
      )
      .setFooter({ text: "Music Bot • Support" });

    message.reply({ embeds: [embed] });
  }
};