module.exports = class Next {
  static action(self) {
    const voiceChannel = self.getVoiceChannel();
    const args = self.message.content.split(' ');

    if (voiceChannel.connection && voiceChannel.connection.dispatcher) {
      if (args[1]) {
        if (self.YoutubeStream.validateURL(args[1])) {
          this.track = {
            author: self.message.author,
            url: args[1],
          };
          self.addToPlaylist(this.track, true);
        } else {
          self.message.reply('Lecture impossible...');
        }
      }
    }
    self.playNext();
  }
};
