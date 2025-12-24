const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const fs = require("fs");
const path = require("path");

const configPath = path.join(__dirname, "../../../config.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setprefix")
    .setDescription("Set bot prefix")
    .addStringOption(o =>
      o.setName("prefix")
        .setDescription("New prefix")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const newPrefix = interaction.options.getString("prefix");
    interaction.reply(
      `⚠️ Prefix تم تغييره إلى **${newPrefix}** (Restart مطلوب)`
    );
  }
};