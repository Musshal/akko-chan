module.exports = client => {
  client.on('guildMemberAdd', member => {
    const message =
      `Selamat datang di server akademikode, <@${member.id}>`;
    const channel = member.guild.channels.cache.get('863467786540810240');
    channel.send(message);
  })
  client.on('guildMemberRemove', member => {
    const message =
      `<@${member.id}> telah meninggalkan server akademikode`;
    const channel = member.guild.channels.cache.get('863467786540810240');
    channel.send(message);
  })
}
