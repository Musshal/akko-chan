const dotenv = require('dotenv').config();
const Discord = require('discord.js'); // require the discord.js module
const fs = require('fs');
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith(
  '.js'));
const commandFolders = fs.readdirSync('./commands');
const {
  prefix,
  token
} = require('../config.json');

const client = new Discord.Client(); // create a new Discord client

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

// when the client is ready, run this code
// this event will only trigger one time after logging in
for (const file of eventFiles) {
  const event = require(`../events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file =>
    file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`../commands/${folder}/${file}`);
    // set a new item in the Collection
    // with the key as the command and the value as the exported module
    client.commands.set(command.name, command);
  }
}

client.on('message', message => {
  const {
    content,
    author
  } = message;
  const {
    cooldowns
  } = client;

  if (!content.startsWith(prefix) || author.bot) return;

  const args = content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName) || client.commands.find(
    cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;
  if (!client.commands.has(commandName)) return;
  if (command.guildOnly && message.channel.type === 'dm') {
    return message.reply(
      'Maaf yah, aku tidak bisa mengeksekusi perintah tersebut!');
  }

  if (command.permissions) {
    const authorPerms = message.channel.permissionsFor(message.author);
    if (!authorPerms || !authorPerms.has(command.permissions)) {
      return message.reply(
        'kamu tidak mempunyai hak untuk menjalankan perintah tersebut!');
    }
  }

  if (command.args && !args.length) {
    let reply =
      `Kamu harus memberikan argumen untuk menjalankan perintah tersebut, ${message.author}!`;
    if (command.usage) {
      reply +=
        `\nPenggunaan yang layak: \`${prefix}${command.name} ${command.usage}\``;
    }
    return message.channel.send(reply);
  }

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) +
      cooldownAmount;
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `silahkan menunggu ${timeLeft.toFixed()} detik sebelum dapat menjalankan perintah \`${command.name}\` lagi.`
        )
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply(
      'terdapat kesalahan ketika mencoba mengeksekusi perintah tersebut!');
  }
});

// client setup (keep reading)
client.login(process.env.TOKEN); // login to Discord with your app's token
