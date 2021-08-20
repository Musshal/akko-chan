const fs = require('fs');

module.exports = {
  name: 'reload',
  description: 'Reloads a Command',
  args: true,
  cooldown: 5,
  execute(message, args) {
    const commandName = args[0].toLowerCase();
    const command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) {
      return message.channel.send(`Tidak ada perintah dengan nama atau alias \`${commandName}\`, ${message.author}!`)
    }

    const commandFolders = fs.readdirSync('./commands');
    const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${command.name}.js`));

    delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];

    try {
      const newCommand = require(`../${folderName}/${command.name}.js`);
      
      message.client.commands.set(newCommand.name, newCommand);
      message.channel.send(`Perintah \`${newCommand.name}\` telah dimuat ulang!`);
    } catch (error) {
      console.error(error);

      message.channel.send(`Terdapat kesalahan ketika memuat ulang perintah \`${command.name}\`:\n\`${error.message}\``);
    }
  }
}