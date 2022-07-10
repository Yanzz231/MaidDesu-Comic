const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app)
const io = require('socket.io')(server);
const useragent = require('express-useragent');
const {
    html
} = require('./lib/html')
const {
    func
} = require('./lib/function')
const fs = require('fs');
// DISCORD

const discord = require('discord.js');
const client = new discord.Client()
const { Player } = require('discord-player');

client.player = new Player(client);
client.config = require('./bot');
client.emotes = client.config.emojis;
client.durasi = client.config.durasi;
client.filters = client.config.filters;
client.commands = new discord.Collection();
client.on('message', async message => {
    if (message.author.bot || message.channel.type === 'dm') return;
    require('./MsgDC')(message, client)
});
const player = fs.readdirSync('./player').filter(file => file.endsWith('.js'));
for (const file of player) {
    const event = require(`./player/${file}`);
    client.player.on(file.split(".")[0], event.bind(null, client));
};
client.login('NzU3ODU3NDYzMDc5Nzk2NzM3.X2mfww.KU-Z5SJ_Kys0Sp16mifA5jUmPyc');
const config = JSON.parse(fs.readFileSync('./lib/config.json'));
const data = JSON.parse(fs.readFileSync('./database/data.json'));
const newd = JSON.parse(fs.readFileSync('./database/new.json'));
app.use(express.static(process.cwd() + '/public'));
app.use(useragent.express());

app.param('a', function (req, res, next, a) {
    const modified = a
    req.accepted = modified;
    next();
});
app.param('b', function (req, res, next, b) {
    const modified = b
    req.b = modified;
    next();
});

// Router

app.get('/tes', (req, res) => {
    res.send(req.useragent);
})

app.get('/', function (req, res, next) {
    var pop = html.popularList(data)
    if(req.useragent.isDesktop){
        var last = html.lastUpdate(newd, 16)
        var a = Math.floor(data.length / 15) < data.length / 15 ? Math.floor(data.length / 15) + 1 : Math.floor(data.length / 15)
        var main = html.mainDash(pop, last, html.pageGen(a, 1, '/page/'), config)
        return res.send(html.indexPage(main, 'home', config));
    }else if(req.useragent.isMobile){
        var last = html.lastUpdate(newd, 17)
        var a = Math.floor(data.length / 16) < data.length / 16 ? Math.floor(data.length / 16) + 1 : Math.floor(data.length / 16)
        var main = html.mainDash(pop, last, html.pageGen(a, 1, '/page/'), config)// lupa gw ada return nya
        return res.send(html.indexPage(main, 'home', config)); // html.lastupdate ga 
    }else{
        return res.status(404).send(html.indexPage(html.errorPage('Error', 'Unknown Device', 'Please use Desktop or Mobile Device', config), 'home', config));
    }
})

app.get('/page', function (req, res) {
    return res.redirect('/page/1');
})

app.get('/page/:a', function (req, res) {
    var pop = html.popularList(data)
    var g = 15    
    if(req.useragent.isDesktop){
        g = 15
        var a = Math.floor(data.length / 15) < data.length / 15 ? Math.floor(data.length / 15) + 1 : Math.floor(data.length / 15)
    }else if(req.useragent.isMobile){
        g = 16
        var a = Math.floor(data.length / 16) < data.length / 16 ? Math.floor(data.length / 16) + 1 : Math.floor(data.length / 16)
    }else{
        return res.status(404).send(html.indexPage(html.errorPage('Error', 'Unknown Device', 'Please use Desktop or Mobile Device', config), 'home', config));
    }
    var b = isNaN(parseInt(req.params.a)) ? 1 : parseInt(req.params.a)
    var z = func.dataUpdate(newd, Math.floor(parseInt(b)), parseInt(g))
    var last = html.lastUpdate(z)
    if (b > a) return res.status(404).send(html.indexPage(html.errorPage('Page Not Found', '404 Not Found', config), '', config));
    var main = html.mainDash(pop, last, html.pageGen(a, Math.floor(parseInt(b)), '/page/'), config)
    return res.send(html.indexPage(main, 'home', config));
})

app.get('/genre-list', (req, res) => {
    var a = func.getListGenre(data)
    if (!a) return res.status(404).send(html.indexPage(html.errorPage('Page Not Found', '404 Not Found', config), '', config));
    var main = html.genreList(a)
    return res.send(html.indexPage(main, '', config));
})

app.get('/genre-list/:a', (req, res) => {
    const a = req.params.a;
    const z = 1
    if (a) {
        if (isNaN(parseInt(z))) return res.status(404).send(html.indexPage(html.errorPage('Page Not Found', '404 Not Found', config), '', config));
        if (parseInt(z) < 1) return res.status(404).send(html.indexPage(html.errorPage('Page Not Found', '404 Not Found', config), '', config));
        var b = func.searchGenre(data, a)
        if (!b) return res.status(404).send(html.indexPage(html.errorPage('Page Not Found', '404 Not Found', config), '', config));
        var c = func.pageData(b, parseInt(Math.floor(z)), 12)
        if (!c) return res.status(404).send(html.indexPage(html.errorPage('Page Not Found', '404 Not Found', config), '', config));
        var d = Math.floor(b.length / 12) < b.length / 12 ? Math.floor(b.length / 12) + 1 : Math.floor(b.length / 12)
        var main = html.genrePage(c, a, html.pageGen(d, parseInt(Math.floor(z)), `/genre-list/${a}/`))
        return res.send(html.indexPage(main, '', config));
    } else {
        return res.send('403 Forbidden');
    }
})

app.get('/genre-list/:a/:b', (req, res) => {
    const a = req.params.a;
    const z = req.params.b
    if (!z || isNaN(parseInt(z))) {
        z = 1
    }
    if (a) {
        if (isNaN(parseInt(z))) return res.status(404).send(html.indexPage(html.errorPage('Page Not Found', '404 Not Found', config), '', config));
        if (parseInt(z) < 1) return res.status(404).send(html.indexPage(html.errorPage('Page Not Found', '404 Not Found', config), '', config));
        var b = func.searchGenre(data, a)
        if (!b) return res.status(404).send(html.indexPage(html.errorPage('Page Not Found', '404 Not Found', config), '', config));
        var c = func.pageData(b, Math.floor(parseInt(z)), 12)
        if (!c) return res.status(404).send(html.indexPage(html.errorPage('Page Not Found', '404 Not Found', config), '', config));
        var d = Math.floor(b.length / 12) < b.length / 12 ? Math.floor(b.length / 12) + 1 : Math.floor(b.length / 12)
        var main = html.genrePage(c, a, html.pageGen(d, Math.floor(parseInt(z)), `/genre-list/${a}/`))
        return res.send(html.indexPage(main, '', config));
    } else {
        return res.send('403 Forbidden');
    }
})

app.get('/manga-list', (req, res) => {
    var dbm = func.getListAZ(data)
    if (!dbm) return res.status(404).send(html.indexPage(html.errorPage('Page Not Found', '404 Not Found', config), '', config));
    var list = html.listManga(dbm)
    if (!list) return res.status(404).send(html.indexPage(html.errorPage('Page Not Found', '404 Not Found', config), '', config))
    var main = html.MangaList(dbm, list)
    return res.send(html.indexPage(main, 'manga', config));
})

app.get('/search', (req, res) => {
    var q = req.query.q;
    var z = req.query.page;
    if (!q) return res.status(400).send(html.indexPage(html.errorPage('Please enter a parameter q!', '400 Bad Request', config), '', config));
    if (!z) {
        z = 1
    }
    if (isNaN(parseInt(z))) return res.status(404).send(html.indexPage(html.errorPage('Page Not Found', '404 Not Found', config), '', config));
    if (parseInt(z) < 1) return res.status(404).send(html.indexPage(html.errorPage('Page Not Found', '404 Not Found', config), '', config));
    var c = func.search(data, q)
    var a = func.pageData(c, Math.floor(parseInt(z)), 12)
    var search = html.search(a)
    var b = Math.floor(c.length / 12) < c.length / 12 ? Math.floor(c.length / 12) + 1 : Math.floor(c.length / 12)
    if (z > b) return res.status(404).send(html.indexPage(html.errorPage('Page Not Found', '404 Not Found', config), '', config));
    var searchH = html.searchMain(search, q, html.pageGen(b, Math.floor(parseInt(z)), `/search?q=${q}&page=`), config)
    if (!search) return res.status(404).send(html.indexPage(searchH, '', config));
    return res.send(html.indexPage(searchH, '', config));
})

app.get('/advanced-search', function (req, res) {
    var q = req.query.title
    var a = req.query.author
    var s = req.query.status
    var t = req.query.type
    var g = req.query.genre
    var z = req.query.page
    if (!a || a === undefined || a.length < 1 || a.replace(/\s/g, '').length < 1) {
        a = ''
    }
    if (!s || s === undefined || s.length < 1 || s.replace(/\s/g, '').length < 1) {
        s = 'all'
    }
    if (!t || t === undefined || t.length < 1 || t.replace(/\s/g, '').length < 1) {
        t = 'all'
    }
    if (!g || g === undefined || g.length < 1 || g.replace(/\s/g, '').length < 1) {
        g = 'all'
    }
    if (!z || z === undefined || z.length < 1 || z.replace(/\s/g, '').length < 1 || isNaN(parseInt(z))) {
        z = 1
    }
    var avs = func.advancedSearch(data, q, a, s, t, g)
    var f = func.pageData(avs, Math.floor(parseInt(z)), 12)
    var obj = {
        title: q ? q : null,
        author: a ? a : null,
        status: s ? s.includes('ongo') ? 'ongo' : s === 'end' ? 'end' : 'all' : null,
        type: t ? t : null,
        genre: g ? g : null
    }
    var d = Math.floor(avs.length / 12) < avs.length / 12 ? Math.floor(avs.length / 12) + 1 : Math.floor(avs.length / 12)
    if (Math.floor(parseInt(z)) > d + 1) return res.status(404).send(html.indexPage(html.errorPage('Page Not Found', '404 Not Found', config), '', config))
    var hasl = html.search(f)
    var main = html.indexAdvS(data, obj, d > 1 ? html.pageGen(d, Math.floor(parseInt(z)), `/advanced-search?title=${q}&author=${a}&status=${s.includes('ongo') ? 'ongo' : s === 'end' ? 'end': ''}&type=${t === 'all' ? '' : ''}&genre=${g === 'all' ? '' : g}&page=`) : '', hasl)
    return res.send(html.indexPage(main, '', config))
})

app.get('/:a/:b', (req, res) => {
    const a = req.params.a;
    const b = req.params.b;
    if (a && b) {
        var dataManga = func.searchManga(data, b)
        if (!dataManga) return res.status(404).send(html.indexPage(html.errorPage('Page Not Found', '404 Not Found', config), '', config));
        if (req.url === dataManga.url) {
            var main = html.infoManga(dataManga)
            return res.send(html.indexPage(main, '', config));
        } else {
            return res.status(404).send(html.indexPage(html.errorPage('Page Not Found', '404 Not Found', config), '', config));
        }
    } else {
        return res.send('403 Forbidden');
    }
})

app.get('/:a/:b/:c', (req, res) => {
    const a = req.params.a;
    const b = req.params.b;
    const c = req.params.c;
    if (a && b) {
        var dataManga = func.searchManga(data, b)
        if (!dataManga) return res.status(404).send(html.indexPage(html.errorPage('Page Not Found', '404 Not Found', config), '', config));
        if (req.url === dataManga.url) {
            var main = html.infoManga(dataManga)
            return res.send(html.indexPage(main, '', config));
        } else {
            if (isNaN(parseInt(c))) return res.status(404).send(html.indexPage(html.errorPage('Page Not Found', '404 Not Found', config), '', config));
            if (parseInt(c) < 1) return res.status(404).send(html.indexPage(html.errorPage('Page Not Found', '404 Not Found', config), '', config));
            var cekesps = func.findChapter(dataManga, parseInt(c))
            if (!cekesps) return res.status(404).send(html.indexPage(html.errorPage('Page Not Found', '404 Not Found', config), '', config));
            var eps = html.epsListM(dataManga, parseInt(c))
            if (!eps) return res.status(404).send(html.indexPage(html.errorPage('Page Not Found', '404 Not Found', config), '', config))
            var imglist = html.listImage(dataManga, parseInt(c))
            if (!imglist) return res.status(404).send(html.indexPage(html.errorPage('Page Not Found', '404 Not Found', config), '', config))
            var main = html.readManga(dataManga, eps, imglist, parseInt(c), config)
            return res.send(html.indexPage(main, '', config));
        }
    } else {
        return res.send('403 Forbidden');
    }
})

io.on('connection', (socket) => {
    socket.on('search', (q) => {
        var anjai = []
        anjai.push(data)
        var dek = anjai[0]
        var hasil = dek.filter(x => x.title.toLowerCase().includes(q.toLowerCase()))
        var cuy = []
        if (hasil.length < 1) return socket.emit('search', false)
        if (hasil.length < 5) {
            for (var i = 0; i < hasil.length; i++) {
                var obj = {
                    "title": hasil[i].title,
                    "url": hasil[i].url,
                    "type": hasil[i].type,
                    "img": hasil[i].img,
                    "status": hasil[i].status
                }
                cuy.push(obj)
            }
            socket.emit('search', cuy)
        } else if (hasil.length >= 5) {
            for (var i = 0; i < 5; i++) {
                var obj = {
                    "title": hasil[i].title,
                    "url": hasil[i].url,
                    "type": hasil[i].type,
                    "img": hasil[i].img,
                    "status": hasil[i].status
                }
                cuy.push(obj)
            }
            socket.emit('search', cuy)
        }
    })
})

app.get('*', function (req, res) {
    return res.status(404).send(html.indexPage(html.errorPage('Page Not Found', '404 Not Found', config), '', config));
})

// Listen
server.listen(config.port, () => {
    console.log(`listening on port ${config.port}`);
})