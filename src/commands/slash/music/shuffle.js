const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("shuffle")
    .setDescription("Shuffle the queue"),

  async execute(interaction, client) {
    const queue = client.player.nodes.get(interaction.guild.id);
    if (!queue)
      return interaction.reply({ content: "❌ مفيش ميوزك شغالة", ephemeral: true });

    queue.tracks.shuffle();
    interaction.reply("🔀 تم خلط الكيو");
  }
};