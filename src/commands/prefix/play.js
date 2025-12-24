const ux = require("../../utils/ux");

module.exports = {
  name: "play",
  async execute(message, args, client) {
    const voice = message.member.voice.channel;
    if (!voice)
      return message.reply({
        embeds: [ux.error("لازم تدخل فويس الأول 🎧")]
      });

    const query = args.join(" ");
    if (!query)
      return message.reply({
        embeds: [ux.error("اكتب اسم الأغنية أو اللينك")]
      });

    const result = await client.player.search(query, {
      requestedBy: message.author
    });

    if (!result.tracks.length)
      return message.reply({
        embeds: [ux.error("ملقتش نتيجة للأغنية دي")]
      });

    const queue = client.player.nodes.create(message.guild, {
      metadata: message.channel
    });

    if (!queue.connection)
      await queue.connect(voice);

    queue.addTrack(result.tracks[0]);
    if (!queue.node.isPlaying())
      await queue.node.play();

    message.reply({
      embeds: [
        ux.success(`تم تشغيل **${result.tracks[0].title}** 🎶`)
      ]
    });
  }
};