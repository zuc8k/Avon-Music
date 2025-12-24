const { SlashCommandBuilder } = require("discord.js");
const ux = require("../../../utils/ux");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("loop")
    .setDescription("Set loop mode")
    .addStringOption(o =>
      o.setName("mode")
        .setDescription("off | track | queue")
        .setRequired(true)
        .addChoices(
          { name: "off", value: "off" },
          { name: "track", value: "track" },
          { name: "queue", value: "queue" }
        )
    ),

  async execute(interaction, client) {
    const queue = client.player.nodes.get(interaction.guild.id);
    if (!queue)
      return interaction.reply({ embeds: [ux.error("مفيش ميوزك شغالة")], ephemeral: true });

    const map = { off: 0, track: 1, queue: 2 };
    const mode = interaction.options.getString("mode");
    queue.setRepeatMode(map[mode]);

    interaction.reply({ embeds: [ux.success(`Loop: **${mode}** 🔁`)] });
  }
};