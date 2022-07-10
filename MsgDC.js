module.exports = msgHandlerDiscord = async (message, client) => {
    try {
        // MODULE
        const fs = require("fs");
        // DATA
        const moment = require('moment')
        let prefix = "."
        body = message.content
        const fetch = require('node-fetch')
        const { src } = require('./scraper/scraper')
        const { func } = require('./lib/function')
        // const allanime = getAnime()
        const ownerID = ["757857463079796737", "786145311503941652", "508963965691232256"]
        const isOwner = ownerID.includes(client.user.id)
        const commnad = body.trim().split(/ +/).shift().toLowerCase()
        const argsMc = body.split(' ')
        if (commnad === prefix + "help") {
            message.channel.send({
                embed: {
                    color: 'RED',
                    author: { name: 'HELP PANEL' },
                    footer: { text: 'Made By Yanz' },
                    fields: [
                        { name: `${client.emotes.music} Music`, value: '`Play`, `Loop`, `Queue`, `NowPlaying`, `Resume`, `Pause`, `Skip`. `Stop`, `Volume`' },
                        { name: `${client.emotes.obeng} Utility`, value: '`Ping`, `Say`' },
                        { name: `${client.emotes.king} Moderator`, value: '`purge`' }
                    ],
                    timestamp: new Date(),
                    thumbnail: { url: 'https://cdn.discordapp.com/avatars/757857463079796737/5d5f958a1f867d79a7b723d671a64aeb.webp' },
                    description: `Ini Adalah Command Command Yang Ada Di Yanz BOT`,
                },
            });
        }
        if (commnad === prefix + "add") {
            if (isOwner) {
                var a = argsMc[1]
                if (a.length < 1 || a.replace(/\s/g, '').length < 1 || !a) return message.channel.send("Please Enter A Valid Link")
                src.getDoujin(a).then(async (b) => {
                    if (b.ch.length < 1) return message.channel.send("There seems to be an error with the link, please try again")
                    var c = func.newData(JSON.parse(fs.readFileSync('./database/data.json')), b.title, b.desc, b.img, b.genre, b.type, b.studio, b.status, b.rating)
                    if (!c) return message.channel.send("This doujin is already in the database")
                    b.ch.forEach(x => {
                        src.getImage(x.link).then(e => {
                            var d = func.toUrl(`${b.type}/${b.title}/$${x.ch}`)
                            func.newChapter(JSON.parse(fs.readFileSync('./database/data.json')), JSON.parse(fs.readFileSync('./database/new.json')), d, x.ch, e, '', b.status) 
                            // kalo download kita bikin aja looping semua img jadiin pdf tar bikin action baru
                            // lebih sulit keknya itu
                            // mangadesu/judul/eps/download
                            // tinggal singkronin aja
                            // ini coba di vps
                        })
                    })
                })
            }
        }
        if (commnad === prefix + "eval") {
            if (isOwner) {
                try {
                    return message.channel.send(JSON.stringify(eval(argsMc[1]), null, '\t'));
                } catch (e) {
                    a = String(e)
                    message.channel.send(`Error banh`)
                    console.log(a)
                }
            }
        }
        if (commnad === prefix + "ping") {
            message.channel.send(`${client.emotes.success} - Ping : **${client.ws.ping}ms** !`);
        }
        if (commnad === prefix + "say") {
            message.channel.send(`${body.slice(5)}`);
        }
        if (commnad === prefix + "purge") {
            if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`${client.emotes.error} - You Don't Have Permissions !`).then(msg => {
                setTimeout(() => msg.delete(), client.durasi.message)
            })
            if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`${client.emotes.error} - I Don't Have Permissions !`).then(msg => {
                setTimeout(() => msg.delete(), client.durasi.message)
            })
            if (argsMc[1].length < 1) return message.channel.send(`${client.emotes.error} - Please Supply A Valid Amount To Delete Messages !`).then(msg => {
                setTimeout(() => msg.delete(), client.durasi.message)
            })
            if (isNaN(argsMc[1]))
                return message.channel.send(`${client.emotes.error} - Please Supply A Valid Amount To Delete Messages !`).then(msg => {
                    setTimeout(() => msg.delete(), client.durasi.message)
                })

            if (argsMc[1] > 100)
                return message.channel.send(`${client.emotes.error} - Please Supply A Number Less Than 100 !`).then(msg => {
                    setTimeout(() => msg.delete(), client.durasi.message)
                })

            if (argsMc[1] < 1)
                return message.channel.send(`${client.emotes.error} - Please Supply A Number More Than 1 !`).then(msg => {
                    setTimeout(() => msg.delete(), client.durasi.message)
                })

            message.channel.bulkDelete(argsMc[1])
                .then(messages => message.channel.send(`${client.emotes.success} - Deleted ${messages.size} / ${argsMc[1]} Messages !`).then(msg => msg.delete({ timeout: client.durasi.message }))).catch(() => null)
        }
        if (commnad === prefix + "volume") {
            if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel !`).then(msg => {
                setTimeout(() => msg.delete(), client.durasi.message)
            })

            if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You are not in the same voice channel !`).then(msg => {
                setTimeout(() => msg.delete(), client.durasi.message)
            })

            if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - No music currently playing !`).then(msg => {
                setTimeout(() => msg.delete(), client.durasi.message)
            })

            if (!argsMc[1] || isNaN(argsMc[1]) || argsMc[1] === 'Infinity') return message.channel.send(`${client.emotes.error} - Please enter a valid number !`).then(msg => {
                setTimeout(() => msg.delete(), client.durasi.message)
            })

            if (Math.round(parseInt(argsMc[1])) < 1 || Math.round(parseInt(argsMc[1])) > 100) return message.channel.send(`${client.emotes.error} - Please enter a valid number (between 1 and 100) !`).then(msg => {
                setTimeout(() => msg.delete(), client.durasi.message)
            })

            const success = client.player.setVolume(message, parseInt(argsMc[1]));

            if (success) message.channel.send(`${client.emotes.success} - Volume set to **${parseInt(argsMc[1])}%** !`);
        }
        if (commnad === prefix + "stop" || commnad === prefix + "leave") {
            if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel !`).then(msg => {
                setTimeout(() => msg.delete(), client.durasi.message)
            })

            if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You are not in the same voice channel !`).then(msg => {
                setTimeout(() => msg.delete(), client.durasi.message)
            })

            if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - No music currently playing !`).then(msg => {
                setTimeout(() => msg.delete(), client.durasi.message)
            })

            client.player.setRepeatMode(message, false);
            const success = client.player.stop(message);

            if (success) message.channel.send(`${client.emotes.success} - Music **stopped** into this server !`)
        }
        if (commnad === prefix + "skip") {
            if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel !`).then(msg => {
                setTimeout(() => msg.delete(), client.durasi.message)
            })

            if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You are not in the same voice channel !`).then(msg => {
                setTimeout(() => msg.delete(), client.durasi.message)
            })

            if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - No music currently playing !`).then(msg => {
                setTimeout(() => msg.delete(), client.durasi.message)
            })

            const success = client.player.skip(message);

            if (success) message.channel.send(`${client.emotes.success} - The current music has just been **skipped** !`)
        }
        if (commnad === prefix + "play") {
            if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel !`).then(msg => {
                setTimeout(() => msg.delete(), client.durasi.message)
            })
            if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You are not in the same voice channel !`).then(msg => {
                setTimeout(() => msg.delete(), client.durasi.message)
            })
            if (!argsMc[1]) return message.channel.send(`${client.emotes.error} - Please indicate the title of a song !`).then(msg => {
                setTimeout(() => msg.delete(), client.durasi.message)
            })
            client.player.play(message, argsMc[1], { firstResult: true });
        }
        if (commnad === prefix + "nowplaying") {
            if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel !`).then(msg => {
                setTimeout(() => msg.delete(), client.durasi.message)
            })

            if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You are not in the same voice channel !`).then(msg => {
                setTimeout(() => msg.delete(), client.durasi.message)
            })

            if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - No music currently playing !`).then(msg => {
                setTimeout(() => msg.delete(), client.durasi.message)
            })

            const track = client.player.nowPlaying(message);
            const filters = [];

            Object.keys(client.player.getQueue(message).filters).forEach((filterName) => client.player.getQueue(message).filters[filterName]) ? filters.push(filterName) : false;

            message.channel.send({
                embed: {
                    color: 'RED',
                    author: { name: track.title },
                    footer: { text: 'Made By Yanz & Pudidi' },
                    fields: [
                        { name: 'Channel', value: track.author, inline: true },
                        { name: 'Requested by', value: track.requestedBy.username, inline: true },
                        { name: 'From playlist', value: track.fromPlaylist ? 'Yes' : 'No', inline: true },

                        { name: 'Views', value: track.views, inline: true },
                        { name: 'Duration', value: track.duration, inline: true },
                        { name: 'Filters activated', value: filters.length + '/' + client.filters.length, inline: true },

                        { name: 'Volume', value: client.player.getQueue(message).volume, inline: true },
                        { name: 'Repeat mode', value: client.player.getQueue(message).repeatMode ? 'Yes' : 'No', inline: true },
                        { name: 'Currently paused', value: client.player.getQueue(message).paused ? 'Yes' : 'No', inline: true },

                        { name: 'Progress bar', value: client.player.createProgressBar(message, { timecodes: true }), inline: true }
                    ],
                    thumbnail: { url: track.thumbnail },
                    timestamp: new Date(),
                },
            });
        }
        if (commnad === prefix + "pause") {
            if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel !`).then(msg => {
                setTimeout(() => msg.delete(), client.durasi.message)
            })

            if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You are not in the same voice channel !`).then(msg => {
                setTimeout(() => msg.delete(), client.durasi.message)
            })

            if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - No music currently playing !`).then(msg => {
                setTimeout(() => msg.delete(), client.durasi.message)
            })

            if (client.player.getQueue(message).paused) return message.channel.send(`${client.emotes.error} - The music is already paused !`).then(msg => {
                setTimeout(() => msg.delete(), client.durasi.message)
            })

            const success = client.player.pause(message);

            if (success) message.channel.send(`${client.emotes.success} - Song ${client.player.getQueue(message).playing.title} paused !`);
        }
        if (commnad === prefix + "resume") {
            if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel !`);

            if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You are not in the same voice channel !`);

            if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - No music currently playing !`);

            if (!client.player.getQueue(message).paused) return message.channel.send(`${client.emotes.error} - The music is already playing !`);

            const success = client.player.resume(message);

            if (success) message.channel.send(`${client.emotes.success} - Song ${client.player.getQueue(message).playing.title} resumed !`);
        }
        if (commnad === prefix + "queue") {
            if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel !`);

            if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You are not in the same voice channel !`);
            const queue = client.player.getQueue(message);

            if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - No songs currently playing !`);

            message.channel.send({
                embed: {
                    color: 'RED',
                    author: { name: `Server Queue - ${message.guild.name} ${client.player.getQueue(message).loopMode ? '( Loop )' : ''}` },
                    footer: { text: 'Made By Yanz' },
                    fields: [
                        { name: 'Now', value: `${queue.playing.title} | ${queue.playing.author}\n\n` },
                        {
                            name: 'Queue', value: queue.tracks.map((track, i) => {
                                return `**#${i + 1}** - ${track.title} | ${track.author} ( Requested by : ${track.requestedBy.username} )`
                            })
                        },
                    ],
                    thumbnail: { url: queue.playing.thumbnail },
                    timestamp: new Date(),
                },
            });
        }
        if (commnad === prefix + "loop") {
            if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel !`).then(msg => {
                setTimeout(() => msg.delete(), client.durasi.message)
            })

            if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You are not in the same voice channel !`).then(msg => {
                setTimeout(() => msg.delete(), client.durasi.message)
            })

            if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - No music currently playing !`).then(msg => {
                setTimeout(() => msg.delete(), client.durasi.message)
            })

            if (argsMc[1] === 'queue') {
                if (client.player.getQueue(message).loopMode) {
                    client.player.setLoopMode(message, false);
                    return message.channel.send(`${client.emotes.success} - Repeat mode **disabled** !`);
                } else {
                    client.player.setLoopMode(message, true);
                    return message.channel.send(`${client.emotes.success} - Repeat mode **enabled** the whole queue will be repeated endlessly !`);
                };
            } else {
                if (client.player.getQueue(message).repeatMode) {
                    client.player.setRepeatMode(message, false);
                    return message.channel.send(`${client.emotes.success} - Repeat mode **disabled** !`);
                } else {
                    client.player.setRepeatMode(message, true);
                    return message.channel.send(`${client.emotes.success} - Repeat mode **enabled** the current music will be repeated endlessly !`);
                };
            };
        }
    } catch (err) {
        console.log(err)
    }
}