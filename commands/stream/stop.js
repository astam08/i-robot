module.exports = class Stop {
  static action(self) {
    const voiceChannel = self.getVoiceChannel(false);
    if (voiceChannel.connection) {
      self.emptyPlaylist();
      voiceChannel.connection.disconnect();
      voiceChannel.leave();
    } else {
      self.message.reply('BERHASIL KELUAR☑️');
    }
  }
};
