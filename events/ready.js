const intro = require('./intro');
const antiAds = require('./antiAds');
const inviteNotifications = require('./inviteNotifications');

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    client.user.setPresence({
      activity: {
        name: 'akademikode',
        type: 'WATCHING'
      },
      status: 'online'
    });
    
    console.log(`Siap! Masuk sebagai ${client.user.tag}`);

    inviteNotifications(client);
    intro(client);
    antiAds(client);
  }
}