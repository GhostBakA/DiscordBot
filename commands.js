const fs = require("fs");

module.exports = message => {

    noMusicText = ['No more songs when I\'m here',
        'Fuk off buddy', 'No more songs for you',
        'Nein',
        'Nope',
        'Muhauhahuahahua']

    noMusic = () => {
        return noMusicText[Math.floor(Math.random() * noMusicText.length)];
    }

    var noSongs = false;

    toggleSongs = (message) => {
        fs.readFile('no-music.json', (err, data) => {
            if (err) throw err;
            const records = JSON.parse(data);
            index = records.findIndex(server => {
                return server.serverId == message.guild.id
            })
            if (index === -1) {
                server = {
                    "serverId": message.guild.id,
                    "noSongsFlag": true,
                    "channels": []
                }
                records.push(server)
                noSongs = true;
            } else {
                records[index].noSongsFlag = !records[index].noSongsFlag
                noSongs = records[index].noSongsFlag
            }
            fs.writeFile('no-music.json', JSON.stringify(records), err => {
                if (err) throw err;
            })

            // Server ID: console.log(message.guild.id)
            // Channel ID: console.log(voiceChannel.id)
        });
        noSongs === true ? msgChannel.send('No more Songs on this server') : msgChannel.send('You can play your songs :)');
    }

    getNoSongsValue = (message) => {
        fs.readFile('no-music.json', (err, data) => {
            if (err) throw err;
            const records = JSON.parse(data);
            index = records.findIndex(server => {
                return server.serverId == message.guild.id
            })
            if (index === -1) {
                noSongs = true;
            }
            else {
                console.log("Records noSongsFlag = ", records[index].noSongsFlag)
                noSongs = records[index].noSongsFlag
            }
        });
    }

    // To Disconnect users / move them
    // newMember.setVoiceChannel(null);
    msg = message.content
    msgChannel = message.channel
    getNoSongsValue(message)
    console.log(noSongs)
    switch (true) {
        case msg.startsWith('!r'):
            {
                reply = reply = msg.replace("!r", "")
                msgChannel.send(reply)
                break;
            }
        case (msg.startsWith('!s')): {
            reply = msg.replace("!s", "")
            for (i = 0; i < 20; i++) {
                msgChannel.send(reply)
            }
            break;
        }
        case (msg.startsWith('bakchod')): {
            message.member.voice.channel.join()
            msgChannel.send('Incoming')
            break;
        }
        case (msg.startsWith('!nomusic')): {
            toggleSongs(message);
            break;
        }
        case (noSongs): {
            voiceChannel = message.member.voice.channel
            console.log("message : " + msg)
            switch (true) {
                case msg.startsWith('!play'): {
                    voiceChannel ? voiceChannel.join() : '';
                    setTimeout(() => { msgChannel.send('!leave'); msgChannel.send(noMusic()) }, 1000);
                    break;
                }
                case msg.startsWith('=play'): {
                    voiceChannel ? voiceChannel.join() : '';
                    setTimeout(() => { msgChannel.send('=leave'); msgChannel.send(noMusic()) }, 1000);
                    break;
                }
                case msg.startsWith('>play'): {
                    voiceChannel ? voiceChannel.join() : '';
                    setTimeout(() => { msgChannel.send('>leave'); msgChannel.send(noMusic()) }, 1000);
                    break;
                }
                case msg.startsWith('+play'): {
                    voiceChannel ? voiceChannel.join() : '';
                    setTimeout(() => { msgChannel.send('+leave'); msgChannel.send(noMusic()) }, 1000);
                    break;
                }
                default: { 
                    console.log("Default Case")
                }
            }
        }
    }
}