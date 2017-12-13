module.exports = class List {
  static action(self) {
    this.list = '';
    const playing = (self.playing && !self.playing.empty) ? `En lecture : ${self.playing.trackInfo}\n` : null;

    if (self.playlist && self.playlist.length > 0) {
      self.playlist.map((element, it) => (self.YoutubeStream
        .getInfo(element.url)
        .then(info => new Promise(resolve =>
          resolve(`${it + 1} - ${info.title}\n`)))))
        .reduce((list, elementPromise) => list.then(() => elementPromise).then((element) => {
          this.list += element;
        }), Promise.resolve()).then(() => {
          if (playing !== '') {
            this.list = playing + this.list;
          }
          self.message.channel.send(this.list);
        });
    } else if (playing) {
      self.message.channel.send(playing);
    } else {
      self.message.reply('La playlist est vide...');
    }
  }
};
