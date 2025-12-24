const { SlashCommandBuilder } = require("discord.js");
const { getUserVoice } = require("../../../utils/voice");
const { getOrCreateQueue } = require("../../../utils/music");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play a song")
    .addStringOption(opt =>
      opt.setName("query")
        .setDescription("Song name or link")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const voice = getUserVoice(interaction.member);
    if (!voice)
      return interaction.reply({ content: "ادخل فويس 🎧", ephemeral: true });

    const query = interaction.options.getString("query");
    await interaction.deferReply();

    const result = await client.player.search(query, {
      requestedBy: interaction.user
    });

    if (!result.tracks.length)
      return interaction.editReply("❌ مفيش نتيجة");

    const queue = await getOrCreateQueue(
      client,
      interaction.guild,
      interaction.channel
    );

    if (!queue.connection)
      await queue.connect(voice);

    queue.addTrack(result.tracks[0]);
    if (!queue.node.isPlaying())
      await queue.node.play();

    interaction.editReply(`🎶 شغال: **${result.tracks[0].title}**`);
  }
};