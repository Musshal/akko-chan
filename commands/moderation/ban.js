module.exports = {
  name: 'ban',
  description: 'Ban Members',
  guildOnly: true,
  cooldown: 5,
  permissions: 'BAN_MEMBERS',
  execute(message, args) {
    const user = message.mentions.users.first();

    if (user) {
      const member = message.guild.member(user);

      if (member) {
        member.ban({
          reason: 'Melanggar aturan!'
        }).then(() => {
          message.reply(`${user.tag} berhasil di-ban!`)
        }).catch(err => {
          message.reply('Aku tidak bisa melakukan ban member tersebut!');
          console.error(err);
        });
      } else {
        message.reply('User tersebut tidak ada di server ini!');
      }
    } else {
      message.reply('Kamu tidak menyebutkan user untuk di-ban!');
    }
  }
}
