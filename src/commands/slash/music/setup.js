const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits
} = require("discord.js");

const panelState = require("../../../player/state");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Setup the music system panel")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction, client) {
    const channel = interaction.channel;

    // امسح Panel قديم لو موجود
    const old = panelState.get(interaction.guild.id);
    if (old) {
      try {
        const ch = await client.channels.fetch(old.channelId);
        const msg = await ch.messages.fetch(old.messageId);
        await msg.delete();
      } catch {}
      panelState.delete(interaction.guild.id);
    }

    // Embed الرئيسي
    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setTitle(`🎵 Current Queue | 0 entries for ${interaction.guild.name}`)
      .setDescription(
        "Join a voice channel and start listening to music 🎧\n\n" +
        "Send **SONG LINK** or **SONG NAME** in this channel."
      )
      .setFooter({ text: "Free Music Bot" });

    // صف الأزرار (الأساسي)
    const row1 = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("music_back")
        .setEmoji("⏮️")
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId("music_pause")
        .setEmoji("⏯️")
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId("music_skip")
        .setEmoji("⏭️")
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId("music_stop")
        .setEmoji("⏹️")
        .setStyle(ButtonStyle.Danger)
    );

    // صف الصوت
    const row2 = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("music_vol_down")
        .setEmoji("🔉")
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId("music_vol_up")
        .setEmoji("🔊")
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId("music_shuffle")
        .setEmoji("🔀")
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId("music_loop")
        .setEmoji("🔁")
        .setStyle(ButtonStyle.Secondary)
    );

    // صف إضافي
    const row3 = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("music_queue")
        .setEmoji("📜")
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId("music_clear")
        .setEmoji("🗑️")
        .setStyle(ButtonStyle.Danger)
    );

    const message = await channel.send({
      embeds: [embed],
      components: [row1, row2, row3]
    });

    // حفظ الحالة
    panelState.set(interaction.guild.id, {
      channelId: channel.id,
      messageId: message.id
    });

    interaction.reply({
      content: `✅ Successfully setup the Music System in: ${channel}`,
      ephemeral: true
    });
  }
};