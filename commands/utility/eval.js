module.exports = {
  name: 'eval',
  description: '',
  args: true,
  cooldown: 5,
  execute(message, args) {
    const { content } = message;
    const result = eval(args[0]);
    
    message.channel.send(result);
  }
}