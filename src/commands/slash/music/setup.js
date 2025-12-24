const {
  SlashCommandBuilder,
  PermissionFlagsBits
} = require("discord.js");

const {
  createNowPlayingEmbed,
  createControlButtons
} = require("../../../player/panel");

const panelState = require("../../../player/state");

/**
 * /setup
 * Create a persistent music control panel in a specific text channel
 */
module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Setup the music control panel")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption(option =>
      option
        .setName("channel")
        .setDescription("Channel where the music panel will be created")
        .setRequired(true)
    ),

  async execute(interaction) {
    const channel = interaction.options.getChannel("channel");

    if (!channel || !channel.isTextBased()) {
      return interaction.reply({
        content: "❌ اختار روم كتابي فقط",
        ephemeral: true
      });
    }

    // Send control panel message
    let message;
    try {
      message = await channel.send({
        embeds: [createNowPlayingEmbed(null, null)],
        components: createControlButtons()
      });
    } catch (err) {
      console.error(err);
      return interaction.reply({
        content: "❌ فشل إنشاء لوحة التحكم",
        ephemeral: true
      });
    }

    // Save panel state
    panelState.set(interaction.guild.id, {
      channelId: channel.id,
      messageId: message.id
    });

    // Confirm setup
    await interaction.reply({
      content: `✅ تم إنشاء لوحة التحكم بنجاح في ${channel}`,
      ephemeral: true
    });
  }
};