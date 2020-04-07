var Discord = require('discord.js');
var dotenv = require('dotenv');
var express = require('express');
const app = express()
const port = process.env.PORT || 3000;
dotenv.config();

//Cron Job to keep Heroku App Alive
var cron = require('node-cron');
var https = require('https');

cron.schedule('0,30 * * * *', () => {
    const options = {
        hostname: 'bakchod-bot.herokuapp.com',
        path: '/',
        method: 'GET'
    }

    const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)

        res.on('data', d => {
            console.log('Success')
        })
    })

    req.on('error', error => {
        console.error(error)
    })

    req.end()
});

// Initialize Discord Bot
authToken = process.env.AUTH_TOKEN
var bot = new Discord.Client();
bot.on('ready', function (evt) {
    console.log("Bot status : " + bot.presence.status)
});
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

bot.login(authToken);

app.get('/', (req, res) => {
    res.send("Bot Status : " + bot.presence.status)
})

app.listen(port, () => console.log("App listening at 'localhost:" + port + "'"))
