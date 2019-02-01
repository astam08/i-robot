const Discord = require('discord.js');

const bot = new Discord.Client();
const Google = require('./commands/google');
const Ping = require('./commands/ping');
const Stream = require('./commands/stream/stream');
const Config = require('./config');
const Hello = require('./commands/hello');
const Help = require('./commands/help');
// const Jokes = require('./commands/jokes');

bot.on('ready', () => {
  /*
    bot.user.setAvatar('avatar.jpg')
      .then(() => console.log('Avatar mis en place avec succès.'))
      .catch(console.error);
    bot.user.setUsername('I-Robot');
    */

  Stream.getStreamInfo(bot);
});

bot.on('guildMemberAdd', (member) => {
  member.createDM()
    .then((channel) => {
      channel.send(`Bienvenue sur le channel ${member.displayName} :sunglasses:`);
    })
    .catch();
});

bot.on('message', (message) => {
  if (message.author.id !== bot.id) {
    Stream.parse(message);
    Ping.parse(message);
    Google.parse(message);
    Help.parse(message);
    // Jokes.parse(message);
    if (message.content.includes(`<@${bot.user.id}>`)) {
      Hello.parse(message);
    }
    if (message.guild
      && message.author.id === message.guild.ownerID
      && message.content.includes('!disconnect')) {
      bot.destroy()
        .catch();
      process.exit();
    }
  }
});

bot.on('voiceStateUpdate', (oldMember, newMember) => {
  let guildID = newMember.guild.id;
  guildID = guildID ? oldMember.guild.id : guildID;

  const guild = bot.guilds.get(guildID);
  const botMember = guild.members.get(bot.user.id);

  Stream.checkEmptyChannel(guild.channels.get(botMember.voiceChannelID));
});

bot.login(Config.token())
  .catch();
Stream.YoutubeApiKey = Config.YoutubeApiKey();

// TODO: Add Jokes + Add shortcuts
