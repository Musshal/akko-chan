const fetch = require('node-fetch');
module.exports = {
  name: 'gif',
  description: 'Posting GIFs',
  cooldown: 5,
  async execute(message, args) {
    if (!args.length) {
      let url =
        `https://g.tenor.com/v1/search?q=anime&key=${process.env.TENOR}`;
      let response = await fetch(url);
      let json = await response.json();
      let index = Math.floor(Math.random() * json.results.length);
      message.channel.send(json.results[index].url);
    } else {
      let url =
        `https://g.tenor.com/v1/search?q=${args}&key=${process.env.TENOR}`;
      let response = await fetch(url);
      let json = await response.json();
      let index = Math.floor(Math.random() * json.results.length);
      message.channel.send(json.results[index].url);
    }
  }
}
