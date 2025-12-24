const { SlashCommandBuilder } = require("discord.js");
const ux = require("../../../utils/ux");
const queueEmbed = require("../../../player/queueEmbed");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Show current queue"),

  async execute(interaction, client) {
    const queue = client.player.nodes.get(interaction.guild.id);
    if (!queue)
      return interaction.reply({ embeds: [ux.info("📭 الكيو فاضية")], ephemeral: true });

    interaction.reply({ embeds: [queueEmbed(queue)] });
  }
};