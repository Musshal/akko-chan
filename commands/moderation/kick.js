module.exports = {
  name: 'kick',
  description: 'Kick Member',
  cooldown: 5,
  guildOnly: true,
  permissions: 'KICK_MEMBERS',
  execute(message, args) {
    if (!message.mentions.users.size) {
      return message.reply('Kamu harus tag user yang ingin ditendang!');
    }

    const taggedUser = message.mentions.users.first();

    if (taggedUser) {
      const member = message.guild.member(taggedUser);

      if (taggedUser) {
        member.kick('Melanggar aturan').then(() => {
          message.reply(`${taggedUser.tag} Berhasil ditendang!`);
        }).catch(err => {
          message.reply('Aku tidak bisa menendang member tersebut!');
          console.error(err);
        });
      }
    }
  }
}
