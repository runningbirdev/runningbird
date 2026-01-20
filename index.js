const { Client, GatewayIntentBits, Partials } = require("discord.js");
const express = require("express");

const app = express();
app.get("/", (req, res) => res.send("Bot is alive"));
app.listen(3000);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessages
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

// ===== CONFIG =====
const MESSAGE_ID = "ID_PESAN";
const ROLE_ID = "ID_ROLE";
const EMOJI = "✅";
// ==================

client.once("ready", () => {
  console.log(`Bot online: ${client.user.tag}`);
});

client.on("messageReactionAdd", async (reaction, user) => {
  if (user.bot) return;
  if (reaction.partial) await reaction.fetch();

  if (reaction.message.id === MESSAGE_ID && reaction.emoji.name === EMOJI) {
    const member = await reaction.message.guild.members.fetch(user.id);
    member.roles.add(ROLE_ID);
  }
});

client.on("messageReactionRemove", async (reaction, user) => {
  if (user.bot) return;
  if (reaction.partial) await reaction.fetch();

  if (reaction.message.id === MESSAGE_ID && reaction.emoji.name === EMOJI) {
    const member = await reaction.message.guild.members.fetch(user.id);
    member.roles.remove(ROLE_ID);
  }
});

client.login(process.env.TOKEN);
