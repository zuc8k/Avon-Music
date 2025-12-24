const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("autoplay")
    .setDescription("Toggle autoplay"),

  async execute(interaction, client) {
    const queue = client.player.nodes.get(interaction.guild.id);
    if (!queue)
      return interaction.reply({ content: "❌ مفيش ميوزك شغالة", ephemeral: true });

    queue.setAutoPlay(!queue.autoPlay);
    interaction.reply(`🔁 Autoplay: **${queue.autoPlay ? "On" : "Off"}**`);
  }
};