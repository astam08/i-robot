const Command = require('../command');
const Pause = require('./pause');
const Play = require('./play');
const Stop = require('./stop');
const Resume = require('./resume');
const Next = require('./next');
const YoutubeStream = require('ytdl-core');


const streamMessage = ['!play', '!stop', '!next', '!pause', '!resume'];

let playlist = [];
let localPlayingID;

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
     *
     * @param authorFirst
     * @returns {*|null}
     */
  static getVoiceChannel(authorFirst = true) {
    // Author's voice channel ID if connected to one
    const authorVoiceChannelID = this.message.member.voiceChannelID;

    // Default voice channel
    let defaultVoiceChannel = this.message.guild.channels
      .filter(channel => channel.type === 'voice')
      .first();

    // default channel or bot's voice channel if connected
    if (this.voiceChannel && this.voiceChannel.joinable) {
      defaultVoiceChannel = this.voiceChannel;
    }

    if (authorFirst) {
      // Author's voice channel if connected or default channel
      this.voiceChannel = (authorVoiceChannelID
        ? this.message.guild.channels.get(authorVoiceChannelID)
        : defaultVoiceChannel);
    }

    return this.voiceChannel;
  }

  /**
     * Add given track to playlist
     *
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

  /**
     * Used in stop.js
     */
  static emptyPlaylist() {
    playlist = [];
  }

  /**
     * Handles voiceChannel disconnection and starts playing on new connection
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
     * Starts next track in playlist on given connection
     *
     * @param connection
     */
  static play(connection) {
    try {
      this.playing = playlist.shift();
      this.playing.stream = YoutubeStream(this.playing.url, { filter: 'audioonly' });

      this.playing.stream.on('info', (info) => {
        this.playing.trackInfo = info.title;
        this.getStreamInfo(this.bot, this.playing.trackInfo);
        this.message.channel.send(`Lecture de **${this.playing.trackInfo}** envoyé par ${this.playing.author}`);
      });

      setTimeout(() => {
        localPlayingID = this.playing.id;
      }, 1000);

      connection
        .playStream(this.playing.stream, this.streamOptions)
        .on('speaking', (plays) => {
          if (plays) {
            this.getStreamInfo(this.bot, this.playing.trackInfo);
          } else {
            this.getStreamInfo(this.bot, `${this.playing.trackInfo} (paused)`);
          }
        })
        .on('error', () => {
          this.getStreamInfo(this.bot);
          this.message.reply('Lecture impossible...');
          if (connection) {
            connection.channel.leave();
            this.voiceChannel = null;
          }
        })
        .on('end', () => {
          if (playlist.length > 0) {
            setTimeout(() => {
              if (this.playing.id === localPlayingID) {
                this.playing = null;
                this.playNext();
              }
            }, 1500);
          } else {
            this.getStreamInfo(this.bot);
            this.playing = null;
            this.message.channel.send('Fin de la playlist');
            connection.channel.leave();
            this.voiceChannel = null;
          }
        });
    } catch (e) {
      this.getStreamInfo(this.bot);
      this.message.reply('Lecture impossible...');
      if (connection) {
        connection.channel.leave();
        this.voiceChannel = null;
      }
    }
  }

  /**
     * Sets the title of the playing game of the bot with the given data
     *
     * @param bot
     * @param data
     */
  static getStreamInfo(bot, data = 'Dreaming') {
    if (!this.bot) {
      this.bot = bot;
    }

    bot.user.setPresence({
      game: {
        name: data, type: 0,
      },
    }).catch();
  }

  /**
     * Checks if the bot's voice channel is empty
     * If it is, stream is paused if it was playing
     * If not, stream is resumed if it was paused
     *
     * @param voiceChannel
     */
  static checkEmptyChannel(voiceChannel) {
    this.voiceChannel = voiceChannel;
    if (this.voiceChannel) {
      if (this.voiceChannel.members.array().length < 2
                && this.voiceChannel.connection
                && this.voiceChannel.connection.dispatcher
                && !this.voiceChannel.connection.dispatcher.paused) {
        Pause.action(this, false);
      } else if (this.voiceChannel.members.array().length >= 2
                && this.voiceChannel.connection
                && this.voiceChannel.connection.dispatcher
                && this.voiceChannel.connection.dispatcher.paused) {
        Resume.action(this, false);
      }
    }
  }
};
