const { REST, Routes, SlashCommandBuilder } = require("discord.js");

const TOKEN = process.env.TOKEN;
const CLIENT_ID = "1293170838454931467";
const GUILD_ID = "1293545859920957490";

const commands = [
  new SlashCommandBuilder()
    .setName("roles")
    .setDescription("Pilih role menggunakan tombol")
    .toJSON()
];

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
  try {
    console.log("Registering slash commands...");

    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands }
    );

    console.log("✅ Command /roles berhasil didaftarkan");
  } catch (error) {
    console.error("❌ Gagal register command:", error);
  }
})();


