module.exports = {
  name: 'args-info',
  description: 'Info Argumen',
  args: true,
  cooldown: 5,
  execute(message, args) {
    message.channel.send(
      `Nama perintah: args-info\nArgumen: ${args}\nPanjang argumen: ${args.length}`
      );
  }
}
