const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { createNowPlayingEmbed, createControlButtons } = require("../../../player/panel");
const { panels } = require("../../../player/state");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Setup the music control panel")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption(opt =>
      opt.setName("channel")
        .setDescription("Channel for music panel")
        .setRequired(true)
    ),

  async execute(interaction) {
    const channel = interaction.options.getChannel("channel");
    if (!channel.isTextBased())
      return interaction.reply({ content: "اختار روم كتابي فقط", ephemeral: true });

    const message = await channel.send({
      embeds: [createNowPlayingEmbed()],
      components: createControlButtons()
    });

    panels.set(interaction.guild.id, {
      channelId: channel.id,
      messageId: message.id
    });

    await interaction.reply({
      content: `✅ تم إنشاء لوحة التحكم في ${channel}`,
      ephemeral: true
    });
  }
};