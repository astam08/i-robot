module.exports = class Play {
  static action(self) {
    this.voiceChannel = self.getVoiceChannel(false);
    this.args = self.message.content.split(' ');
    this.impossible = false;
    this.track = null;

    if (this.args[1]) {
      if (self.YoutubeStream.validateURL(this.args[1])) {
        this.addTrack(self.message.author, this.args[1], new Date().getUTCMilliseconds(), self);
      } else {
        self.YoutubeSearch(self.message.content.replace(this.args[0], ''), self.searchOptions)
          .then((result) => {
            const results = result.results;
            let linkFound = '';

            for (let i = 0; i < results.length; i += 1) {
              if (results[i].kind === 'youtube#video') {
                linkFound = results[i].link;

                if (self.YoutubeStream.validateURL(linkFound)) {
                  this.addTrack(
                    self.message.author,
                    linkFound,
                    new Date().getUTCMilliseconds(),
                    self,
                  );

                  break;
                }
              }
            }
          });
      }
    }
  }

  static addTrack(author, url, id, self) {
    this.track = {
      author,
      url,
      id,
    };

    self.addToPlaylist(this.track);

    this.endAction(self);
  }

  static endAction(self) {
    if (this.voiceChannel && this.voiceChannel.connection) {
      if (this.voiceChannel.connection.dispatcher && !this.args[1]) {
        if (this.voiceChannel.connection.dispatcher.paused) {
          this.voiceChannel.connection.dispatcher.resume();
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

  /**
   * Function replying "impossible to read" if "this.impossible" is true
   *
   * @param self
   */
  static reply(self) {
    if (this.impossible) {
      self.message.reply('Lecture impossible...');
    }
  }
};
