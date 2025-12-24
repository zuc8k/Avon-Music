module.exports = (client) => {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.slashCommands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction, client);
    } catch (err) {
      console.error(err);
      if (interaction.replied || interaction.deferred) {
        interaction.editReply("❌ حصل خطأ");
      } else {
        interaction.reply({ content: "❌ حصل خطأ", ephemeral: true });
      }
    }
  });
};
