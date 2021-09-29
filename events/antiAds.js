module.exports = client => {
  client.on('message', async message => {
    const isInvite = async (guild, code) => {
      return await new Promise(resolve => {
        guild.fetchInvites().then(invites => {
          for (const invite of invites) {
            if (code === invite[0]) {
              resolve(true);
              return;
            }
          }
          resolve(false);
        });
      });
    }
    const {
      guild,
      member,
      content
    } = message;
    const code = content.split('discord.gg/')[1];

    if (message.channel.name !== '🔗┃link' && message.channel.name !==
      '💻┃project-show-off' && message.channel.name !==
      '🔔┃info-course' && message.channel.name !== '🔔┃info-bootcamp' &&
      message.channel.name !== '🔔┃info-webinar' && message.channel
      .name !== '🔔┃info-contest' && message.channel.name !==
      '🔔┃info-loker' && message.channel.name !==
      '📚┃notes-resources' && message.channel.name !==
      '📺┃funtainment' && message.channel.name !== '📢┃announcement' &&
      message.channel.name !== '📷┃instagram-post' && message.channel
      .name !== '💻┃new-videos' && message.channel.name !==
      '💻┃new-videos' && message.channel.name !== '💻┃other-videos' &&
      message.channel.name !== '💻┃ctf-videos' && message.channel
      .name !== '💻┃tiktok-corner' && message.channel.parent.id !==
      '864397824329121802' && message.channel.parent.id !==
      '866345583844524052' && message.channel.parent.id !==
      '867466305493925898' && message.channel.parent.id !==
      '863469442406154270' && message.channel.parent.id !==
      '864197001997189150' && message.channel.parent.id !==
      '868389297726840892' && message.channel.parent.id !==
      '862336547281829970' && message.channel.parent.id !==
      '867811904374439946' && message.channel.parent.id !==
      '864199756401082388' && message.channel.parent.id !==
      '869523247312556062') {
      if (!content.includes('.gif') && !content.includes('youtube') && !
        content.includes('instagram')) {
        if (content.includes('https://ww') || content.includes(
            'http://ww') || content.includes(
          'https://www.discord.gg/') || content.includes(
            'http://www.discord.gg/') || content.includes(
            'www.discord.gg/') || content.includes('discord.gg/')) {
          const isOurInvite = await isInvite(guild, code);
          if (!isOurInvite) {
            message.delete();
          }
        }
      }
    } else {
      if (message.channel.name !== '🔗┃link' && message.channel.name !==
        '💻┃project-show-off' && message.channel.name !==
        '🔔┃info-course' && message.channel.name !==
        '🔔┃info-bootcamp' && message.channel.name !==
        '🔔┃info-webinar' && message.channel.name !==
        '🔔┃info-workshop' && message.channel.name !==
        '🔔┃info-contest' && message.channel.name !== '🔔┃info-loker') {
        if (content.includes('https://www.discord.gg/') || content
          .includes('http://www.discord.gg/') || content.includes(
            'www.discord.gg/') || content.includes('discord.gg/')) {
          const isOurInvite = await isInvite(guild, code);

          if (!isOurInvite) {
            message.delete();
          }
        }
      }
    }
  });
}
