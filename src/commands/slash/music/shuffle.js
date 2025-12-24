const { SlashCommandBuilder } = require("discord.js");
const ux = require("../../../utils/ux");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("shuffle")
    .setDescription("Shuffle the queue"),

  async execute(interaction, client) {
    const queue = client.player.nodes.get(interaction.guild.id);
    if (!queue)
      return interaction.reply({ embeds: [ux.error("مفيش ميوزك شغالة")], ephemeral: true });

    queue.tracks.shuffle();
    interaction.reply({ embeds: [ux.success("تم خلط الكيو 🔀")] });
  }
};