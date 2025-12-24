const ux = require("../../utils/ux");
const queueEmbed = require("../../player/queueEmbed");

module.exports = {
  name: "queue",
  async execute(message, args, client) {
    const queue = client.player.nodes.get(message.guild.id);
    if (!queue)
      return message.reply({ embeds: [ux.info("📭 الكيو فاضية")] });

    message.reply({ embeds: [queueEmbed(queue)] });
  }
};