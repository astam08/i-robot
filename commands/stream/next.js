module.exports = class Next {
  static action(self) {
    const voiceChannel = self.voiceChannel ? self.voiceChannel : self.getVoiceChannel();
    const args = self.message.content.split(' ');

    if (voiceChannel.connection && voiceChannel.connection.dispatcher) {
      if (args[1]) {
        if (self.YoutubeStream.validateURL(args[1])) {
          this.track = {
            author: self.message.author,
            url: args[1],
            id: new Date().getUTCMilliseconds(),
          };
          self.addToPlaylist(this.track, true);
        } else {
          self.message.reply('Lecture impossible...');
          return;
        }
      }
    }
    self.playNext();
  }
};
