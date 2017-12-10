module.exports = class Resume {
  static action(self) {
    const voiceChannel = self.getVoiceChannel();
    if (voiceChannel.connection && voiceChannel.connection.dispatcher) {
      if (voiceChannel.connection.dispatcher.paused) {
        voiceChannel.connection.dispatcher.resume();
      } else {
        self.message.reply('Déjà en train de jouer ! :smile:');
      }
    } else {
      self.message.reply('Je ne joue rien actuellement. :rolling_eyes:');
    }
  }
};
