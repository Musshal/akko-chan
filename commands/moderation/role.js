module.exports = {
  name: 'role',
  description: 'Role Moderations',
  args: true,
  guildOnly: true,
  permissions: 'ADMINISTRATOR',
  execute(message, args) {
    const targetUser = message.mentions.users.first();
    const choice = args[0];
    const roleName = args[1];

    if (choice === 'give') {
      const { guild } = message;
      const role = guild.roles.cache.find(role => {
        return role.name === roleName;
      });

      if (!role) {
        message.reply(`tolong sebutkan nama role yang terdaftar!`);

        return;
      }

      if (!targetUser) {
        message.reply('tolong sebutkan member yang ingin diberikan role dengan benar!');
        
        return;
      }
      
      const member = guild.members.cache.get(targetUser.id);
      member.roles.add(role);

      message.reply(`role ${roleName} berhasil ditambahkan ke member ${targetUser}`);
    } else if (choice === 'remove') {
      const { guild } = message;
      const role = guild.roles.cache.find(role => {
        return role.name === roleName;
      });

      if (!role) {
        message.reply(`tolong sebutkan nama role yang ingin dihapus!`);

        return;
      }

      if (!targetUser) {
        message.reply('tolong sebutkan member yang ingin dihapus role-nya!');
        
        return;
      }

      const member = guild.members.cache.get(targetUser.id);

      if (member.roles.cache.get(role.id)) {
        member.roles.remove(role);
        message.reply(`role ${roleName} telah dihapus dari member ${targetUser}!`);
      } else {
        message.reply(`member tersebut tidak mempunyai role ${roleName}!`);
      }
    } else if (choice === 'has'){
      const { guild } = message;
      const role = guild.roles.cache.find(role => {
        return role.name === roleName;
      });

      if (!role) {
        message.reply(`tolong sebutkan nama role yang ingin dicek!`);

        return;
      }

      if (!targetUser) {
        message.reply('tolong sebutkan member yang ingin dicek role-nya!');
        
        return;
      }

      const member = guild.members.cache.get(targetUser.id);

      if (member.roles.cache.get(role.id)) {
        message.reply(`member ${targetUser} mempunyai role ${roleName}!`);
      } else {
        message.reply(`member tersebut tidak mempunyai role ${roleName}!`);
      }
    }
  }
}