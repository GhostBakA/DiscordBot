var Discord = require('discord.js');
var dotenv = require('dotenv');
var express = require('express');
const app = express()
const port = process.env.PORT || 3000;
dotenv.config();

require('./cronjobs/heroku-cron')

// Initialize Discord Bot
authToken = process.env.AUTH_TOKEN
var bot = new Discord.Client();
bot.on('ready', function (evt) {
    console.log("Bot status : " + bot.presence.status)
});

// Message commands
bot.on('message', message => {
    if (message.author.bot == false) {
        if (message.content.slice(0, 2) == '!r') {
            reply = message.content.replace("!r", "")
            message.channel.send(reply)
        }
        else if (message.content.slice(0, 2) == '!s') {
            reply = message.content.replace("!s", "")
            for (i = 0; i < 20; i++) {
                message.channel.send(reply)
            }
        }
        else if (message.content.slice(0, 7) == 'bakchod') {
            console.log(message.member.voice.channel)
            message.member.voice.channel.join()
        }
    }
});

// Login Bot
bot.login(authToken);


app.get('/', (req, res) => {
    res.send("Bot Status : " + bot.presence.status)
})

app.listen(port, () => console.log("App listening at 'localhost:" + port + "'"))
