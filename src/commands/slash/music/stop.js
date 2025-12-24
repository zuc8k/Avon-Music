const { SlashCommandBuilder } = require("discord.js");
const ux = require("../../../utils/ux");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Stop music and clear queue"),

  async execute(interaction, client) {
    const queue = client.player.nodes.get(interaction.guild.id);
    if (queue) queue.delete();

    interaction.reply({ embeds: [ux.success("تم إيقاف الميوزك ⏹️")] });
  }
};