const Command = require('./command');

const helloMessage = [
  'bonjour',
  'hello',
  'salut',
  'hi',
  'slt',
  'bjr',
  'yo',
  'wesh',
];


module.exports = class Hello extends Command {
  static match(message) {
    return helloMessage.some(value => message.content.toUpperCase().includes(value.toUpperCase()));
  }

  static action(message) {
    const answer = helloMessage[Math.floor(Math.random() * helloMessage.length)];
    message.reply(answer.charAt(0).toUpperCase() + answer.slice(1));
  }
};
