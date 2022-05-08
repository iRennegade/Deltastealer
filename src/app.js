const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.get("/download/:id", (req, res) => {
    if(!fs.existsSync(path.join(__dirname, "/delta/dist/" + req.params.id + "." + req.query.ext))) return res.sendStatus(404);

    res.download(path.join(__dirname, "/delta/dist/" + req.params.id + "." + req.query.ext));
});

app.listen(8080, () => console.log("Express started"));