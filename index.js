const Discord = require('discord.js');

const bot = new Discord.Client();
const Google = require('./commands/google');
const Ping = require('./commands/ping');
const Stream = require('./commands/stream/stream');
const Config = require('./config');
const Hello = require('./commands/hello');

bot.on('ready', () => {
  /*
    bot.user.setAvatar('avatar.jpg')
      .then(() => console.log('Avatar mis en place avec succès.'))
      .catch(console.error);
    bot.user.setUsername('I-Robot');
    */

  bot.user.setGame('Dreaming')
    .then(() => console.log('Jeu mis en place avec succès.'))
    .catch(console.error);
});

bot.on('guildMemberAdd', (member) => {
  member.createDM()
    .then((channel) => {
      channel.send(`Bienvenue sur le channel ${member.displayName} :sunglasses:`);
    }).catch();
});

bot.on('message', (message) => {
  if (message.author.id !== bot.id) {
    Stream.parse(message);
    Ping.parse(message);
    Google.parse(message);
    if (message.content.includes(`<@${bot.user.id}>`)) {
      Hello.parse(message);
    }
    if (message.author.id === message.guild.ownerID &&
            message.content.includes('!disconnect')) {
      bot.destroy();
      process.exit();
    }
  }
});

bot.login(Config.token());
