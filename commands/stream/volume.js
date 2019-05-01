module.exports = class Volume {
  static action(self) {
    const voiceChannel = self.getVoiceChannel(false);
    const args = self.message.content.split(' ');
    const regex = /^\d+?$/;
    const volume = args[1];

    if (volume >= 1 && volume <= 200 && volume.match(regex)) {
      if (voiceChannel && voiceChannel.connection && voiceChannel.connection.dispatcher) {
        voiceChannel.connection.dispatcher.setVolume(volume / 100);
      }
      self.setVolume(volume / 100);
      self.message.reply(`Volume di set ke  ${volume}%`);
    } else {
      self.message.reply('Silahkan masukan 1-200');
    }
  }
};
