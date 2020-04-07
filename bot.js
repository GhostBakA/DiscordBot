var Discord = require('discord.js');
var logger = require('winston');
var dotenv = require('dotenv');
dotenv.config();
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
authToken = process.env.AUTH_TOKEN
console.log(process.env)
console.log(authToken)
var bot = new Discord.Client();
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', message => {
    if (message.author.bot == false) {
        if (message.content.slice(0, 2) == '!r') {
            reply = message.content.replace("!r", "")
            message.channel.send(reply)
        }
        else if(message.content.slice(0, 2) == '!s'){
            reply = message.content.replace("!s", "")
            for(i=0; i<20; i++){
                message.channel.send(reply)
            }
        }
        else if(message.content.slice(0,7) == 'bakchod'){
            console.log(message.member.voice.channel)
            message.member.voice.channel.join()
        }
    }
});

bot.login(authToken);