const { SlashCommandBuilder } = require("discord.js");
const ux = require("../../../utils/ux");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skip current track"),

  async execute(interaction, client) {
    const queue = client.player.nodes.get(interaction.guild.id);
    if (!queue)
      return interaction.reply({ embeds: [ux.error("مفيش ميوزك شغالة")], ephemeral: true });

    queue.node.skip();
    interaction.reply({ embeds: [ux.success("تم تخطي الأغنية ⏭️")] });
  }
};