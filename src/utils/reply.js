async function safeReply(interaction, options) {
  if (interaction.deferred || interaction.replied) {
    return interaction.editReply(options);
  }
  return interaction.reply(options);
}

module.exports = { safeReply };