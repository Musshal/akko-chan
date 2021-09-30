const Discord = require('discord.js');
module.exports = {
  name: 'avatar',
  description: 'Avatar Show',
  cooldown: 5,
  execute(message, args) {
    if (!message.mentions.users.size) {
      const embed = new Discord.MessageEmbed().setTitle(message.author
        .username).setDescription(
        `[Direct Link](${message.author.displayAvatarURL()})`).setColor(
        0x00ffff).setImage(message.author.displayAvatarURL({
        format: 'png',
        dynamic: true,
        size: 1024
      }));
      return message.channel.send(embed);
    }
    const avatarList = message.mentions.users.map(user => {
      const embed = new Discord.MessageEmbed().setTitle(user.username)
        .setDescription(`[Direct Link](${user.displayAvatarURL()})`)
        .setColor(0x00ffff).setImage(user.displayAvatarURL({
          format: 'png',
          dynamic: true,
          size: 1024
        }));
      return embed;
    });
    // send the entire array of strings as a message
    // By default, discord.js will `.join()` the array with `\n`
    message.channel.send(avatarList);
  }
}
