const { SlashCommandBuilder } = require("discord.js");
const ux = require("../../../utils/ux");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resume")
    .setDescription("Resume the paused track"),

  async execute(interaction, client) {
    const queue = client.player.nodes.get(interaction.guild.id);
    if (!queue)
      return interaction.reply({ embeds: [ux.error("مفيش ميوزك شغالة")], ephemeral: true });

    queue.node.resume();
    interaction.reply({ embeds: [ux.success("كملت التشغيل ▶️")] });
  }
};