const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("seek")
    .setDescription("Seek to a position (seconds)")
    .addIntegerOption(o =>
      o.setName("seconds")
        .setDescription("Seconds to seek to")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const queue = client.player.nodes.get(interaction.guild.id);
    if (!queue)
      return interaction.reply({ content: "❌ مفيش ميوزك شغالة", ephemeral: true });

    const sec = interaction.options.getInteger("seconds");
    queue.node.seek(sec * 1000);
    interaction.reply(`⏩ تم التقديم إلى ${sec}s`);
  }
};