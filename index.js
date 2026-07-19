require('dotenv').config();
require('./keepalive.js');
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const config = require('./config.json');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildPresences
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.GuildMember]
});
client.commands = new Collection();
client.buttons = new Collection();
client.modals = new Collection();
client.config = config;
client.db = require('./database/db.js');
['commandHandler','eventHandler','buttonHandler'].forEach(h => require(`./handlers/${h}`)(client));
client.login(process.env.DISCORD_TOKEN);
