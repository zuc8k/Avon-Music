const { EmbedBuilder } = require("discord.js");

module.exports = (client) => {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isStringSelectMenu()) return;
    if (interaction.customId !== "help_menu") return;

    const embed = new EmbedBuilder().setColor(0x5865F2);

    switch (interaction.values[0]) {
      case "music":
        embed
          .setTitle("🎵 Music Commands")
          .setDescription(
            "**تشغيل وتحكم:**\n" +
            "`play` `pause` `resume` `skip` `stop`\n\n" +
            "**Queue & Control:**\n" +
            "`queue` `loop` `shuffle` `seek`\n\n" +
            "**Extra:**\n" +
            "`lyrics` `autoplay`"
          );
        break;

      case "admin":
        embed
          .setTitle("🛠️ Admin Commands")
          .setDescription(
            "`setup`\n" +
            "`resetpanel`\n" +
            "`setprefix`\n" +
            "`defaultvolume`"
          );
        break;

      case "utility":
        embed
          .setTitle("⚙️ Utility Commands")
          .setDescription(
            "`help`"
          );
        break;
    }

    interaction.update({
      embeds: [embed]
    });
  });
};