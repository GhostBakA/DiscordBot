var Discord = require('discord.js');
var dotenv = require('dotenv');
var express = require('express');
const app = express()
const port = process.env.PORT || 3000;
dotenv.config();

require('./cronjobs/heroku-cron')()

// Initialize Discord Bot
authToken = process.env.AUTH_TOKEN
var bot = new Discord.Client();
bot.on('ready', function (evt) {
    console.log("Bot status : " + bot.presence.status)
});

// Message commands
bot.on('message', message => {
    if (message.author.bot == false) {
        require('./commands')(message)
    }
});

// Login Bot
bot.login(authToken);


app.get('/', (req, res) => {
    res.send("Bot Status : " + bot.presence.status)
})

app.listen(port, () => console.log("App listening at 'localhost:" + port + "'"))
