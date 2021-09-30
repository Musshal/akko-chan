module.exports = {
  name: 'user',
  description: 'User Info',
  cooldown: 5,
  execute(message, args) {
    message.channel.send(
      `Username kamu: ${message.author.username}\nID kamu: ${message.author.id}`
      );
  }
}
