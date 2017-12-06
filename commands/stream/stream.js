const Command = require('../command');
const Pause = require('./pause');
const Play = require('./play');
const Stop = require('./stop');
const Resume = require('./resume');
const Next = require('./next');
const YoutubeStream = require('ytdl-core');


const streamMessage = ['!play', '!stop', '!next', '!pause', '!resume'];

let playlist = [];

module.exports = class Stream extends Command {
  static match(message) {
    return streamMessage.includes(message.content.split(' ').shift());
  }

  static action(message) {
    this.volume = 1;
    this.streamOptions = {
      seek: 0,
      volume: this.volume,
      passes: 20,
      bitrate: 'auto',
    };
    this.message = message;
    this.YoutubeStream = YoutubeStream;

    if (message.channel.type !== 'text') {
      message.channel
        .send('Désolé, je ne peux faire ça que ' +
                    'dans un salon textuel :upside_down:');
      return;
    }

    const args = message.content.split(' ');

    switch (args[0]) {
      case '!pause':
        Pause.action(this);
        break;
      case '!play':
        Play.action(this);
        break;
      case '!stop':
        Stop.action(this);
        break;
      case '!resume':
        Resume.action(this);
        break;
      case '!next':
        Next.action(this);
        break;
      default:
    }
  }

  /**
     * Get message author's voice channel or default voice channel
     * @returns {*|Array.<*>}
     */
  static getVoiceChannel() {
    // Author's voice channel ID if connected to one
    const authorVoiceChannelID = this.message.member.voiceChannelID;

    // Default voice channel
    const defaultVoiceChannel = this.message.guild.channels
      .filter(channel => channel.type === 'voice')
      .first();

    // Author's voice channel if connected or default channel

    return (authorVoiceChannelID
      ? this.message.guild.channels.get(authorVoiceChannelID)
      : defaultVoiceChannel);
  }

  /**
     * Add given track to playlist
     * @param track
     * @param first
     */
  static addToPlaylist(track, first = false) {
    if (first) {
      playlist.unshift(track);
    } else {
      playlist.push(track);
    }
    this.message.reply('Ajouté à la playlist :smirk:');
  }

  static emptyPlaylist() {
    playlist = [];
  }

  /**
     * Handle voiceChannel disconnection and start next track
     */
  static playNext() {
    if (playlist.length > 0) {
      const voiceChannel = this.getVoiceChannel();
      if (voiceChannel.connection) {
        voiceChannel.leave();
      }
      voiceChannel
        .join()
        .then((connection) => {
          this.play(connection);
        });
    } else {
      this.message.channel.send("Il n'y a rien à jouer ! :thinking:");
    }
  }

  /**
     * Start next track in playlist
     * @param connection
     */
  static play(connection) {
    try {
      this.playing = playlist.shift();

      this.playing.stream = YoutubeStream(this.playing.url, { filter: 'audioonly' });

      this.playing.stream.on('info', (info) => {
        this.message.channel.send(`Lecture de **${info.title}** envoyé par ${this.playing.author}`);
      });

      connection
        .playStream(this.playing.stream, this.streamOptions)
        .on('error', () => {
          this.message.reply('Lecture impossible...');
          if (connection) {
            connection.channel.leave();
          }
        })
        .on('end', () => {
          connection.channel.leave();
          this.playing = null;
          if (playlist.length > 0) {
            // @TODO: call this.next(); to continue playing the playlist
          } else {
            this.message.channel.send('Fin de la playlist');
          }
        });
    } catch (e) {
      this.message.reply('Lecture impossible...');
      if (connection) {
        connection.channel.leave();
      }
    }
  }

  /**
     * Supposed to check every second if a track is over,
     * and to play the next if there is one.
     *
     * Not used
     */
  static next() {
    setInterval(() => {
      if (!this.playing && playlist.length > 0) {
        Next.action(this);
      }
    }, 1000);
  }
};
