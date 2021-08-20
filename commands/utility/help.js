const { prefix } = require('../../config.json')

module.exports = {
  name: 'help',
  description: 'List all of my commands or info about a specific command.',
  aliases: ['commands'],
  usage: '[command name]',
  cooldown: 5,
  execute(message, args) {
    const data = [];
    const { commands } = message.client;

    if (!args.length) {
      data.push('Berikut adalah daftar perintah untuk aku:');
      data.push(commands.map(command => command.name).join(', '));
      data.push(`\nKamu bisa mengirim \`${prefix}help [command name]\` untuk mendapatkan info perintah yang lebih detail!`);

      return message.author.send(data, { split: true }).then(() => {
          if (message.channel.type === 'dm') return;
          message.reply('Aku telah mengirimkan DM dengan semua perintah untuk aku');
        }).catch(error => {
          console.error(`Aku tidak dapat mengirimkan bantuan ke ${message.author.tag}.\n`, error);
          message.reply('Aku tidak bisa DM kamu! Apakah kamu menonaktifkan DM?');
        })
    }

    const name = args[0].toLowerCase();
    const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

    if (!command) {
      return message.reply('Itu bukan perintah yang valid!');
    }

      data.push(`**Name:** ${command.name}`);

      if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
      if (command.description) data.push(`**Description:** ${command.description}`);
      if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

      data.push(`**cooldown:** ${command.cooldown || 3} second(s)`);

      message.channel.send(data, { split: true });
  }
}