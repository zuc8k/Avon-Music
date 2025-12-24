const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lyrics")
    .setDescription("Get lyrics for current track"),

  async execute(interaction, client) {
    const queue = client.player.nodes.get(interaction.guild.id);
    if (!queue || !queue.currentTrack)
      return interaction.reply({ content: "❌ مفيش أغنية شغالة", ephemeral: true });

    const lyrics = await queue.currentTrack.lyrics();
    if (!lyrics)
      return interaction.reply("❌ مش لاقي كلمات");

    interaction.reply(lyrics.slice(0, 2000));
  }
};