const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  console.log(`Message aaya: ${message.content}`);

  try {
    await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: message.content,
        channelId: message.channelId,
        author: message.author.username
      })
    });
    console.log('n8n ko forward kar diya ✅');
  } catch (err) {
    console.error('Error:', err);
  }
});

client.once('ready', () => {
  console.log(`Bot online: ${client.user.tag}`);
});

client.login(process.env.DISCORD_BOT_TOKEN);
