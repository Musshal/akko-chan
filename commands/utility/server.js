const Discord = require('discord.js');
module.exports = {
  name: 'server',
  description: 'Server Info',
  cooldown: 5,
  execute(message, args) {
    const embed = new Discord.MessageEmbed().setTitle(message.guild.name)
      .setDescription(
        `Total Members: ${message.guild.memberCount}\n\n[Direct Link](${message.guild.iconURL()})`
        ).setImage(message.guild.iconURL({
        format: 'png',
        dynamic: true,
        size: 1024
      }));
    message.channel.send(embed);
  }
}
