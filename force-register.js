const { REST, Routes } = require("discord.js");

const TOKEN = process.env.TOKEN;
const CLIENT_ID = "1293170838454931467";
const GUILD_ID = "1293545859920957490";

const commands = [
  {
    name: "roles",
    description: "Pilih role menggunakan tombol"
  }
];

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
  try {
    console.log("FORCE registering commands...");
    console.log("Commands:", commands);

    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands }
    );

    console.log("✅ FORCE REGISTER SUCCESS");
  } catch (err) {
    console.error("❌ FORCE REGISTER FAILED", err);
  }
})();
