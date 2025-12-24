const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "invite",
  async execute(message, args, client) {
    const inviteLink = `https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=274877990912&scope=bot%20applications.commands`;

    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setTitle("🤖 Invite Bot")
      .setDescription(
        "[اضغط هنا لدعوة البوت لسيرفرك](" + inviteLink + ")"
      )
      .setFooter({ text: "Music Bot • Invite" });

    message.reply({ embeds: [embed] });
  }
};