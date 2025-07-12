// const dotenv = require('dotenv');
// dotenv.config();

// const { Client, Events, GatewayIntentBits } = require('discord.js');

// // Create a new client instance
// const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// client.on("messageCreate", (message) => {
//    if(message.author.bot) return; // Ignore messages from bots
//    else message.reply(`Hello ${message.author.globalName}, Welcome to the server!`);
//    console.log(message);
// });

// client.login(process.env.DISCORD_TOKEN)

require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const { OpenAI } = require("openai");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

client.once("ready", () => {
  console.log(` Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith("!ask")) {
    const userMessage = message.content.replace("!ask", "").trim();
    if (!userMessage) {
      return message.reply("Please ask a question after `!ask`.");
    }

    try {
      await message.channel.sendTyping();
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }],
      });

      const reply = response.choices[0].message.content;
      message.reply(reply);
    } catch (err) {
      console.error(err);
      message.reply(" Error communicating with ChatGPT.");
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
