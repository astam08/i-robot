module.exports = class Play {
  static action(self) {
    const voiceChannel = self.getVoiceChannel();
    const args = self.message.content.split(' ');
    this.impossible = false;
    this.track = null;
    if (args[1]) {
      if (self.YoutubeStream.validateURL(args[1])) {
        this.track = {
          author: self.message.author,
          url: args[1],
        };
        self.addToPlaylist(this.track);
      } else {
        this.impossible = true;
      }
    }

    if (voiceChannel.connection) {
      if (voiceChannel.connection.dispatcher && !args[1]) {
        if (voiceChannel.connection.dispatcher.paused) {
          voiceChannel.connection.dispatcher.resume();
        } else {
          self.message.reply('Déjà en train de jouer ! :smile:');
        }
      }
    } else if (this.track) {
      self.playNext();
    } else {
      this.impossible = true;
    }

    this.reply(self);
  }

  static reply(self) {
    if (this.impossible) {
      self.message.reply('Lecture impossible...');
    }
  }
};
