const express = require("express");

const image = require("./image");

const app = express();
const port = 3000;

app.get("/", async function(req, res) {
    const asciiImage = await image.convertToAsciiArt('./temp/test4.jpg', 300, true);
    res.send(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Test</title></head><body style="font-family: monospace;">${asciiImage}</body>`);
});

app.listen(port, function() {
    console.log(`The express server is running on port ${port}`);
});