module.exports = class Resume {
  static action(self) {
    const voiceChannel = self.getVoiceChannel();
    if (!voiceChannel.connection) {
      self.message.reply('Je ne joue rien actuellement. :rolling_eyes:');
    } else if (voiceChannel.connection.dispatcher &&
               voiceChannel.connection.dispatcher.paused) {
      voiceChannel.connection.dispatcher.resume();
    } else {
      self.message.reply('Déjà en train de jouer ! :smile:');
    }
  }
};
