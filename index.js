const dotenv = require('dotenv');
dotenv.config();

const { Client, Events, GatewayIntentBits } = require('discord.js');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on("messageCreate", (message) => {
   if(message.author.bot) return; // Ignore messages from bots
   else message.reply(`Hello ${message.author.globalName}, Welcome to the server!`);
   console.log(message);
});

client.login(process.env.DISCORD_TOKEN)