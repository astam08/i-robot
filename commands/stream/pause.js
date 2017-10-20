module.exports = class Pause {
  static action(self) {
    const voiceChannel = self.getVoiceChannel();
    if (voiceChannel.connection && voiceChannel.connection.dispatcher) {
      if (voiceChannel.connection.dispatcher.paused) {
        self.message.reply("C'est déjà en pause !");
      } else {
        voiceChannel.connection.dispatcher.pause();
      }
    } else {
      self.message.reply('Je ne joue rien actuellement. :rolling_eyes:');
    }
  }
};
