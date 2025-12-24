const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "about",
  async execute(message, args, client) {
    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setTitle("🎵 Music Bot")
      .setDescription(
        "بوت ميوزك احترافي وسريع\n" +
        "يدعم Slash Commands و Prefix"
      )
      .addFields(
        { name: "👨‍💻 Developer", value: "Owner", inline: true },
        { name: "⚙️ Version", value: "v1.0.0", inline: true },
        { name: "🎶 Features", value: "Music • Queue • Control Panel", inline: false }
      )
      .setFooter({ text: "Music Bot • About" });

    message.reply({ embeds: [embed] });
  }
};