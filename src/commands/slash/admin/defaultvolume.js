const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

let DEFAULT_VOLUME = 50;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("defaultvolume")
    .setDescription("Set default music volume")
    .addIntegerOption(o =>
      o.setName("volume")
        .setDescription("0 - 100")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const vol = interaction.options.getInteger("volume");
    if (vol < 0 || vol > 100)
      return interaction.reply({ content: "❌ من 0 لـ 100", ephemeral: true });

    DEFAULT_VOLUME = vol;
    interaction.reply(`🔊 Default Volume = **${vol}%**`);
  }
};