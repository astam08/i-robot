module.exports = class Pause {
  static action(self, speak = true) {
    const voiceChannel = self.getVoiceChannel(false);
    if (voiceChannel && voiceChannel.connection && voiceChannel.connection.dispatcher) {
      if (!voiceChannel.connection.dispatcher.paused) {
        voiceChannel.connection.dispatcher.pause();
      } else if (speak) {
        self.message.reply("C'est déjà en pause !");
      }
    } else if (speak) {
      self.message.reply('Je ne joue rien actuellement. :rolling_eyes:');
    }
  }
};
