const { Client, Intents } = require('discord.js-selfbot-v13');
const fs = require('fs');
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.MESSAGE_CONTENT
  ]
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', message => {
  if (message.author.bot) return;
  
  const timestamp = new Date().toLocaleString();
  const serverName = message.guild ? message.guild.name : 'Direct Message';
  const serverId = message.guild ? message.guild.id : 'N/A';
  const channelName = message.channel ? message.channel.name : 'Direct Message';
  const channelId = message.channel ? message.channel.id : 'N/A';
  const userTag = message.author.tag;
  const userId = message.author.id;

  const logMessage = {
    timestamp,
    server: {
      name: serverName,
      id: serverId
    },
    channel: {
      name: channelName,
      id: channelId
    },
    user: {
      tag: userTag,
      id: userId
    },
    content: message.content
  };
  
  let data = [];
  if (fs.existsSync('messages.json')) {
    data = JSON.parse(fs.readFileSync('messages.json'));
  }
  
  data.push(logMessage);

  fs.writeFile('messages.json', JSON.stringify(data, null, 2), (err) => {
    if (err) throw err;
    console.log('Message saved to messages.json');
    console.log(`[${timestamp}] [${serverName} (${serverId})] [#${channelName} (${channelId})] [${userTag} (${userId})]: ${message.content}`);
  });
});

client.login('u-token');