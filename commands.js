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

    toggleSongs = (message, noSongs) => {
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
                noSongs.value = true;
            } else {
                records[index].noSongsFlag = !records[index].noSongsFlag
                noSongs.value = records[index].noSongsFlag
            }
            fs.writeFile('no-music.json', JSON.stringify(records), err => {
                if (err) throw err;
            })

            // Server ID: console.log(message.guild.id)
            // Channel ID: console.log(voiceChannel.id)
        });
        noSongs.value === true ? msgChannel.send('No more Songs on this server') : msgChannel.send('You can play your songs :)');
    }

    getNoSongsValue = (message, noSongs) => {
        fs.readFile('no-music.json', (err, data) => {
            if (err) throw err;
            const records = JSON.parse(data);
            index = records.findIndex(server => {
                return server.serverId == message.guild.id
            })
            if (index === -1) {
                noSongs.value = true;
            }
            else {
                console.log("Records noSongsFlag = ", records[index].noSongsFlag)
                noSongs.value = records[index].noSongsFlag
            }
        });
    }

    // To Disconnect users / move them
    // newMember.setVoiceChannel(null);
    noSongs = { value: false }
    msg = message.content
    msgChannel = message.channel
    getNoSongsValue(message, noSongs)
    console.log("After gettings noSongs Value :", noSongs.value)
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
            // toggleSongs(message, noSongs);
            msgChannel.send('Nikal Lawde, ye command nahi bani baka boss se')
            break;
        }
        // case (noSongs.value): {
        case false: {
            voiceChannel = message.member.voice.channel
            console.log("message : " + msg)
            switch (true) {
                case msg.startsWith('!play'): {
                    voiceChannel ? voiceChannel.join() : '';
                    setTimeout(() => { msgChannel.send('!leave'); msgChannel.send(noMusic()) }, 1000);
                    break;
                }
                case msg.startsWith('-play'): {
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