module.exports = {
  name: 'create',
  description: 'Create a Server\'s Channel',
  args: true,
  guildOnly: true,
  execute(message, args) {
    message.guild.channels
      .create(args[0], {
        type: args[1]
      })
      .then(channel => {
        channel.setParent(args[2]);
      });

      message.channel.send(`Yay! Kanal ${args[1]} ${args[0]} berhasil dibuat!`)
  }
}