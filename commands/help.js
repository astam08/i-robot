const Command = require('./command');

module.exports = class Help extends Command {
  static match(message) {
    return message.content.startsWith(';bantuan');
  }

  static action(message) {
    const answer = '```Markdown\n' +
        '# Menu bot\n' +
        '\n' +
        '* ;bantuan - List Menu.\n' +
        '* ;google <recherche> - Error Cuk.\n' +
        '* ;ping -  pong.\n' +
        '* ;disconnect - .(Admin only)\n' +
        '\n' +
        '* Perintah Musik :\n' +
        '\n' +
        '  * ;putar <link YouTube> - .\n' +
      '  * ;putar - .\n' +
      '  * ;skip - Skip Nomor \n' +
      '  * ;skip - SKIP LAGU.\n' +
      '  * ;pause - PAUSE.\n' +
      '  * ;resume - LANJUTKAN LAGU.\n' +
      '  * ;volume <1 - 200> - VOLUME.\n' +
      '  * ;list - MENAMPILKAN PLAYLIST.\n' +
      '  * ;leave - KELUAR.\n' +
      '\n' +
      'Ansel TSM • Z DEVELOPMENT.\n' +
      '```\n';

    message.channel.send(answer);
  }
};
