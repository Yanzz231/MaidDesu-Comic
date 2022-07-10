const fs = require('fs')
const Encodr = require('encodr')
const JS = new Encodr("json")

const moveObj = (db, old_index, new_index) => {
    if (new_index >= db.length) {
        var k = new_index - db.length + 1;
        while (k--) {
            db.push(undefined);
        }
    }
    db.splice(new_index, 0, db.splice(old_index, 1)[0]);
    return db;
}

const newData = (data, title, desc, image, url, [genre], type, studio, status, rating) => {
    const indexDB = data.findIndex(x => x.url.toLowerCase() === url.toLowerCase())
    if (indexDB != -1) return false
    var obj = {
        "title": title,
        "desc": desc,
        "img": image,
        "url": url,
        "genre": genre,
        "time": Date.now(),
        "type": type,
        "studio": studio,
        "status": status,
        "rating": rating,
        "views": 0,
        "chapter": []
    }
    data.push(obj)
    fs.writeFileSync('./database/data.json', JSON.stringify(data, null, 2))
}

const toUrl = (title) => {
    var a = title.toLowerCase()     
    for (var i = 0; i < a.length; i++) {
        if (!a[i].match(/[a-z0-9]/i)) {
            a = a.replace(a[i], '-')
        }
    }
    var b = a.replace(/ /g, '-')
    var c = b.replace(/---/g, '-')
    c.endsWith('-') ? c = c.slice(0, -1) : c = c
    return c
}


const newChapter = (data, nw, url, chapter, [image], download, status) => {
    const indexDB = data.findIndex(x => x.url.toLowerCase() === url.toLowerCase())
    const indexDB2 = nw.findIndex(x => x.url.toLowerCase() === url.toLowerCase())
    if (indexDB === -1) return false
    time = Date.now()        
    var obj = {
        "ip": [],
        "time": time,
        "chapter": chapter,
        "download": download,
        "image": image
    }
    var obj2 = {
        "title": data[indexDB].title,
        "url": data[indexDB].url,
        "type": data[indexDB].type,
        "status": status,
        "img": data[indexDB].img,
        "last": [{
            "chapter": chapter,
            "time": time,
            "url": `${data[indexDB].url}/${chapter}`,
        }]
    }
    var obj3 = {
        "chapter": chapter,
        "time": time,
        "url": `${data[indexDB].url}/${chapter}`,
    }
    data[indexDB].chapter.push(obj)
    if (indexDB2 != -1) {
        nw[indexDB2].last.splice(0, 1)
        nw[indexDB2].last.push(obj3)
        var mobj = moveObj(nw, indexDB2, 0)
        fs.writeFileSync('./database/data.json', JSON.stringify(data, null, 2))
        fs.writeFileSync('./database/new.json', JSON.stringify(mobj, null, 2))
    } else if (indexDB2 === -1) {
        obj2.last.push(obj3)
        nw.push(obj2)
        var mobj = moveObj(nw, nw.length - 1, 0)
        fs.writeFileSync('./database/data.json', JSON.stringify(data, null, 2))
        fs.writeFileSync('./database/new.json', JSON.stringify(mobj, null, 2))
    }
}

const generatePopular = (data) => {
    const indexDB = data.sort((a, b) => (a.views < b.views) ? 1 : -1)
    if (indexDB.length < 1) return false
    return data
}

const findChapter = (data, chapter) => {
    if (!data) return false
    if (data.length < 1) return false
    var indexCH = data.chapter.findIndex(x => x.chapter === parseInt(chapter))
    if (indexCH < 0) return false
    return data.chapter[indexCH]
}

const searchManga = (data, url) => {
    if (!url) return false
    const indexDB = data.findIndex(x => x.url.toLowerCase() === url.toLowerCase())
    if (indexDB === -1) {
        var fak = []
        fak.push(data)
        var anjai = fak[0]
        if (anjai.length < 1) return false
        fak = url.toLowerCase()
        hasil = anjai.filter(x => x.url.toString().toLowerCase().split('/')[2].startsWith(fak))
        if (hasil.length < 1 || !hasil) return false
        return hasil[0]
    }
    return data[indexDB]
}

const dataUpdate = (data, page, n = 15) => {
    let hasil = []
    var a = parseInt(page) === 1 ? 0 : parseInt(page - 1) * parseInt(n)
    for (let i = a; i < a + parseInt(n); i++) {
        if (data[i]) {
            hasil.push(data[i])
        }
    }
    return hasil
}

const pageData = (data, page, n) => {
    let hasil = []
    var a = parseInt(page) === 1 ? 0 : parseInt(page - 1) * parseInt(n)
    for (let i = a; i < a + parseInt(n); i++) {
        if (data[i]) {
            hasil.push(data[i])
        }
    }
    return hasil
}

const getListGenre1 = (data) => {
    var a = data.map(x => x.genre)
    var b = a.flat()
    var c = b.filter((x, i, a) => a.indexOf(x) === i)
    return c
}

const getListGenre2 = (a, b) => {
    var hasil = []
    a.forEach(x => {
        var c = b.filter(y => y.genre.includes(x))
        hasil.push({
            genre: x,
            manga: c.length
        })
    })
    return hasil
}

const getListGenre = (data) => {
    var a = getListGenre1(data)
    var b = getListGenre2(a, data)
    return b
}

const getListAZ = (data) => {
    if (!data) return false
    if (data.length < 1) return false
    let hasil = {
        az: [],
        manga: []
    }
    data.forEach(x => {
        //var a = x.url.split('/')[2].startsWith('-') ? '-' : ''
        //var c = a + x.url.split('/')[2].charAt(0).replace(/[-]/g, '').toUpperCase()
        var a = x.url.split('/')[2].charAt(0).toUpperCase()
        var b = hasil.az.indexOf(a);
        if (b == -1) {
            hasil.az.push(a);
            hasil.manga.push(a + JS.encode(x).toString());
        } else {
            hasil.manga.push(a + JS.encode(x).toString());
        }
    })
    hasil.az.sort();
    hasil.manga.sort();
    if (hasil.az.length < 1) return false
    if (hasil.manga.length < 1) return false
    return hasil
}

const decJson = (json) => {
    return JS.decode(json.subtring(1))
}

const encJson = (json) => {
    return JS.encode(json).toString()
}

const search = (data, q) => {
    var hasil = data.filter(x => x.title.toLowerCase().includes(q.toLowerCase()))
    return hasil
}

const searchGenre = (data, genre) => {
    var hasil = data.filter(x => x.genre.includes(genre))
    if(hasil.length < 1) return false
    return hasil
}

const advancedSearch = (data, title = '', author = '', status = 'all', type = 'all', genre = 'all') => {    
    var hasil1 = data.filter(x => x.title.toLowerCase().includes(title.toLowerCase()))
    var hasil2 = hasil1.filter(x => x.studio.toLowerCase().includes(author.toLowerCase()))
    var hasil3 = status === 'all' ? hasil2 : hasil2.filter(x => x.status === (status.includes('ongo') ? false : true))
    var hasil4 = type === 'all' ? hasil3 : hasil3.filter(x => x.type.toLowerCase().includes(type.toLowerCase()))
    if (genre !== 'all') {
        var hasil7 = []
        hasil4.forEach(x => {
            var hasil6 = x.genre.findIndex(j => j.toLowerCase().includes(genre.toLowerCase()))
            if (hasil6 != -1) {
                hasil7.push(x)
            } else {
                
            }
        })
        return hasil7
    } else {
        return hasil4
    }
}

module.exports = {
    func: {
        generatePopular,
        searchManga,
        newChapter,
        newData,
        dataUpdate,
        findChapter,
        getListGenre,
        getListAZ,
        decJson,
        encJson,
        search,
        pageData,
        searchGenre,
        advancedSearch,
        toUrl
    }
}