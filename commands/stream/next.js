module.exports = class Next {
  static action(self) {
    this.voiceChannel = self.voiceChannel ? self.voiceChannel : self.getVoiceChannel();
    this.args = self.message.content.split(' ');

    if (this.voiceChannel.connection && this.voiceChannel.connection.dispatcher && this.args[1]) {
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
    } else {
      self.playNext();
    }
  }

  static addTrack(author, url, id, self) {
    this.track = {
      author,
      url,
      id,
    };

    self.addToPlaylist(this.track, true);
    self.playNext();
  }
};
