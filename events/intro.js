module.exports = client => {
  client.on('message', async message => {
    const sleep = ms => {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    if (message.channel.id === '863467182061912065') {
      let raw = message.content.split('\n');
      let name = '';
      let domisili = '';
      let profesi = '';
      let institusi = '';
      let hobi = '';
      let referral = '';

      for (let data of raw) {
        data = data.split('?');

        if ((data[0]).toLowerCase() == 'siapa nama kamu') {
          name = data[1];
        } else if ((data[0]).toLowerCase() == 'dimana domisili kamu') {
          domisili = data[1];
        } else if ((data[0]).toLowerCase() ==
          'apa profesi kamu saat ini') {
          profesi = data[1];
        } else if ((data[0]).toLowerCase() == 'apa nama institusinya') {
          institusi = data[1];
        } else if ((data[0]).toLowerCase() == 'apa hobi kamu') {
          hobi = data[1];
        } else if ((data[0]).toLowerCase() ==
          'darimana kamu tahu tentang akademikode') {
          referral = data[1];
        }
      }

      if (name === '' || domisili === '' || profesi === '' ||
        institusi === '' || hobi === '' || referral === '') {
        if (message.author.bot) return;

        await message.react('❌');
        const wrong = await message.channel.send(
          `Tolong memperkenalkan diri sesuai format yang ada di kanal #🙋┃welcome-and-rules yah!`
          );
        await sleep(5000);
        await message.delete();
        await wrong.delete();
      } else {
        await message.react('✅');
        await message.channel.send(
          `Terima kasih ${message.author}, sudah memperkenalkan diri sesuai format. Salam kenal dan selamat bergabung yah!`
          );
        await message.member.roles.add('868843757481652304');
      }
    }
  });
}
