const Command = require('./command');

module.exports = class Help extends Command {
  static match(message) {
    return message.content.startsWith('!help');
  }

  static action(message) {
    const answer = '```Markdown\n' +
        '# Commandes du bot\n' +
        '\n' +
        '* !help - Affiche cette aide.\n' +
        '* !google <recherche> - Donne un lien sur google de la recherche associée.\n' +
        '* !ping - Renvoie pong.\n' +
        '* !disconnect - Déconnecte i-robot du serveur.(Admin only)\n' +
        '\n' +
        '* Commandes de stream :\n' +
        '\n' +
        '  * !play <lien YouTube> - Joue la vidéo liée à l\'URL ou la rajoute à la fin de la playlist.\n' +
      '  * !play - Continue la lecture si elle est en pause.\n' +
      '  * !next <lien YouTube> - Ajoute la vidéo liée à l\'URL au début de la playlist et la joue.\n' +
      '  * !next - Joue la piste suivante.\n' +
      '  * !pause - Met la lecture en pause.\n' +
      '  * !resume - Continue la lecture si elle est en pause.\n' +
      '  * !volume <1 - 200> - Change le volume de lecture.\n' +
      '  * !list - Affiche tous les titres de la playlist.\n' +
      '  * !stop - Arrête la lecture, vide la playlist et fait quitter i-robot du canal vocal.\n' +
      '\n' +
      'Un message incluant @i-robot et une façon de saluer et i-robot vous dira bonjour à sa façon.\n' +
      '```\n';

    message.channel.send(answer);
  }
};
