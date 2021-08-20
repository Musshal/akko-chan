module.exports = {
  name: 'clear',
  description: 'Bulk Delete Messages',
  guildOnly: true,
  cooldown: 5,
  execute(message, args) {
    const amount = parseInt(args[0]) + 1;

    if (isNaN(amount)) {
      return message.reply('Itu bukan angka valid.')
    } else if (amount < 2 || amount > 100) {
      return message.reply('Kamu membutuhkan masukan angka di antara 2 dan 100');
    } else {
        message.channel.bulkDelete(amount, true).catch(err => {
        console.error(err);
        message.channel.send('there was an error trying to prune message in this channel!');
      });
    }
  }
}