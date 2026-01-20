const {
  Client,
  GatewayIntentBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder
} = require("discord.js");
const express = require("express");

const app = express();
app.get("/", (req, res) => res.send("Bot is alive"));
app.listen(3000);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

// ===== CONFIG ROLE =====
const roles = [
  {
    label: "Mole",
    roleId: "1463083209884438589",
    emoji: "🤖",
    customId: "role_Mole"
  },
  {
    label: "PUBGM",
    roleId: "1463083253924757555",
    emoji: "🔫",
    customId: "role_PUBGM"
  },
  {
    label: "Game_Steam",
    roleId: "1463083298380058685",
    emoji: "🎮",
    customId: "role_Game_Steam"
  },
  {
    label: "Roblox_Gunung",
    roleId: "1463083338028945439",
    emoji: "⛰️",
    customId: "role_Roblox_Gunung"
  }
];
// =======================

client.once("ready", async () => {
  console.log(`🤖 Bot online: ${client.user.tag}`);
});

// COMMAND KIRIM EMBED + BUTTON
client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "roles") {
    const embed = new EmbedBuilder()
      .setTitle("📌 Pilih Role Kamu")
      .setDescription(
        "Klik tombol di bawah untuk **mendapatkan atau menghapus role**.\n\n" +
        roles.map(r => `${r.emoji} **${r.label}**`).join("\n")
      )
      .setColor(0x5865F2);

    const row = new ActionRowBuilder().addComponents(
      roles.map(role =>
        new ButtonBuilder()
          .setCustomId(role.customId)
          .setLabel(role.label)
          .setEmoji(role.emoji)
          .setStyle(ButtonStyle.Primary)
      )
    );

    await interaction.reply({ embeds: [embed], components: [row] });
  }
});

// HANDLE BUTTON
client.on("interactionCreate", async interaction => {
  if (!interaction.isButton()) return;

  const roleData = roles.find(r => r.customId === interaction.customId);
  if (!roleData) return;

  const member = interaction.guild.members.cache.get(interaction.user.id);
  const role = interaction.guild.roles.cache.get(roleData.roleId);

  if (member.roles.cache.has(role.id)) {
    await member.roles.remove(role);
    await interaction.reply({ content: `❌ Role **${role.name}** dihapus`, ephemeral: true });
  } else {
    await member.roles.add(role);
    await interaction.reply({ content: `✅ Role **${role.name}** ditambahkan`, ephemeral: true });
  }
});

client.login(process.env.TOKEN);
