const { EmbedBuilder } = require("discord.js");

module.exports = (client) => {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isStringSelectMenu()) return;
    if (interaction.customId !== "help_menu") return;

    let embed = new EmbedBuilder().setColor(0x5865F2);

    if (interaction.values[0] === "music") {
      embed
        .setTitle("🎵 Music Commands")
        .setDescription(
          "`play` `pause` `resume` `skip` `stop`\n" +
          "`queue` `loop` `shuffle` `seek`\n" +
          "`lyrics` `autoplay`"
        );
    }

    if (interaction.values[0] === "admin") {
      embed
        .setTitle("🛠️ Admin Commands")
        .setDescription(
          "`setup` `reset`"
        );
    }

    if (interaction.values[0] === "utility") {
      embed
        .setTitle("⚙️ Utility Commands")
        .setDescription(
          "`help` `ping`"
        );
    }

    interaction.update({
      embeds: [embed]
    });
  });
};