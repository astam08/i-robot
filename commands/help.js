const Command = require('./command');

module.exports = class Help extends Command {
  static match(message) {
    return message.content.startsWith('!help');
  }

  static action(message) {
    const answer = 'Voici les commandes disponibles :\n\n' +
        '\t!help \t\t\t\t\t\t\t\t\tAffiche cette aide.\n' +
        '\t!google <recherche>\t\tDonne un lien sur google de la recherche associée.\n' +
        '\t!ping \t\t\t\t\t\t\t\t\tRenvoie pong.\n' +
        '\t!disconnect \t\t\t\t\t\tDéconnecte i-robot du serveur.(Admin only)\n\n\n' +
        '\tCommandes de stream :\n\n' +
        '\t\t!play <lien YouTube> \t\t  Joue la vidéo liée à l\'URL ou la rajoute à la fin de la playlist.\n' +
        '\t\t!play \t\t\t\t\t\t\t\t\t\tContinue la lecture si elle est en pause.\n' +
        '\t\t!next <lien YouTube> \t\t Ajoute la vidéo liée à l\'URL au début de la playlist et la joue.\n' +
        '\t\t!next \t\t\t\t\t\t\t\t\t\tJoue la piste suivante.\n' +
        '\t\t!pause \t\t\t\t\t\t\t\t\t Met la lecture en pause.\n' +
        '\t\t!resume \t\t\t\t\t\t\t\t  Continue la lecture si elle est en pause.\n' +
        '\t\t!volume <1 - 200>\t\t\t\tChange le volume de lecture.\n' +
        '\t\t!list \t\t\t\t\t\t\t\t\t\t  Affiche tous les titres dans la playlist.\n' +
        '\t\t!stop \t\t\t\t\t\t\t\t\t\tArrête la lecture, vide la playlist et fait quitter i-robot du canal vocal.\n\n\n' +
        '\tUn message incluant @i-robot et une façon de saluer et i-robot vous dira bonjour à sa façon.\n';

    message.reply(answer);
  }
};
