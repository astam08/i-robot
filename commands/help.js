const Command = require('./command');

module.exports = class Help extends Command {
  static match(message) {
    return message.content.startsWith('_rhelp');
  }

  static action(message) {
    const answer = '```Markdown\n' +
        '# Menu bot\n' +
        '\n' +
        '* _rhelp - List Menu.\n' +
        '* _rgoogle -Fitur Telah dihapus📴' +
        '* _rping -  pong.\n' +
        '* disconnect - .(Admin only)\n' +
        '\n' +
        '* Perintah Musik :\n' +
        '\n' +
        '  * _rputar Judul/Link.\n' +
      '  * _rputar - .\n' +
      '  * _rskip .\n' +
      '  * _rskip - .\n' +
      '  * _rpause - .\n' +
      '  * _rresume - .\n' +
      '  * _rvolume 1-200\n' +
      '  * _rlist - 🔀PLAYLIST🔀.\n' +
      '  * _rleave - .\n' +
      '\n' +
      'ANSEL TSM • Z DEVELOPMENT \n' +
      '```\n';

    message.channel.send(answer);
  }
};
