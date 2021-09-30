module.exports = {
  name: 'poll',
  description: 'Create a Polling',
  async execute(message, args) {
    const channelIds = [];
    const addReactions = message => {
      message.react('👍');
      message.react('👎');
    }

    if (channelIds.includes(message.channel.id)) {
      addReactions(message);
    } else {
      await message.delete();

      const fetched = await message.channel.messages.fetch({
        limit: 1
      });

      if (fetched && fetched.first()) {
        addReactions(fetched.first());
      }
    }
  }
}
