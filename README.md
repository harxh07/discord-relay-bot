# discord-relay-bot

A minimal Discord bot that relays every human message in your server to an [n8n](https://n8n.io) webhook, so an n8n workflow (for example an LLM-powered auto-reply) can process it.

## How it works

```
Discord message -> discord.js bot -> HTTP POST -> n8n webhook -> your workflow
```

Each message is forwarded as JSON:

```json
{
  "content": "message text",
  "channelId": "123456789012345678",
  "author": "username"
}
```

Messages sent by bots are ignored, so the bot never relays its own replies.

## Setup

1. Create a bot in the [Discord Developer Portal](https://discord.com/developers/applications), enable the **Message Content Intent**, and invite it to your server.
2. In n8n, create a workflow that starts with a **Webhook** node and copy its production URL.
3. Configure the environment:
   ```bash
   cp .env.example .env
   # then fill in DISCORD_BOT_TOKEN and N8N_WEBHOOK_URL
   ```
4. Install and run (Node.js 18+ required for the built-in `fetch`):
   ```bash
   npm install
   node --env-file=.env index.js   # Node 20.6+, or set the variables in your hosting dashboard
   ```

## Environment variables

| Variable | Description |
| --- | --- |
| `DISCORD_BOT_TOKEN` | Bot token from the Discord Developer Portal |
| `N8N_WEBHOOK_URL` | Production URL of your n8n webhook |

## Security notes

- Never commit your bot token. `.env` is gitignored; only `.env.example` is tracked.
- Treat the webhook URL as a secret; anyone who has it can post to your workflow.
- Message content is forwarded to the webhook. Only run the bot in servers where members know about it.

## License

[MIT](LICENSE)
