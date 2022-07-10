const fs = require('fs');
const Encodr = require('encodr')
const JS = new Encodr("json")
const data = JSON.parse(fs.readFileSync('./database/data.json'));
if (fs.existsSync('./database/d.json')) {
    fs.unlinkSync('./database/d.json')
}

// const getListAZ1 = () => {
//     var a = data.map(x => x.title)//({ url: x.url, title: x.title}));
//     a.sort();
//     var b = a.map(x => x.charAt(0).toUpperCase());
//     return b//{ az: b, manga: a }
// }

// const getListAZ1 = () => {
//     let hasil = {
//         az: [],
//         manga: []
//     }
//     data.forEach(x => {
//         //var a = x.url.split('/')[2].startsWith('-') ? '-' : ''
//         //var c = a + x.url.split('/')[2].charAt(0).replace(/[-]/g, '').toUpperCase()
//         var a = x.url.split('/')[2].charAt(0).toUpperCase()
//         var b = hasil.az.indexOf(a);
//         if (b == -1) {            
//             hasil.az.push(a);
//             hasil.manga.push(a + JS.encode(x).toString());
//         }else{
//             hasil.manga.push(a + JS.encode(x).toString());
//         }
//     })
//     hasil.az.sort();
//     hasil.manga.sort();
//     return hasil
// }

// const listManga = (data) => {
//     tanda = data.az[0]
//     p = `<div class="mangalist-blc"><span><a name="${data.az[0]}">${data.az[0]}</a></span>
//     <ul>`
//     data.manga.forEach((x, i) => {
//         var a = JS.decode(x.substring(1))
//         tanda === x.charAt(0)
//         if (tanda != x.charAt(0)) {
//             p += `</ul></div>`
//             p += `<div class="mangalist-blc"><span><a name="${x.charAt(0)}">${x.charAt(0)}</a></span>
//             <ul>`
//             tanda = x.charAt(0)
//             p += `<li class="${a.type.charAt(0).toUpperCase()}${a.type.slice(1)}">
//         <a class="series" rel="${i}" href="${a.url}">${a.title}</a>
//     </li>`
//         }else{
//             p += `<li class="${a.type.charAt(0).toUpperCase()}${a.type.slice(1)}">
//         <a class="series" rel="${i}" href="${a.url}">${a.title}</a>
//     </li>`
//         }
//     })
//     p += `</ul>
// </div>`
//     return p
// }

// const getListAZ3 = (abc) => {
//     var obj = {
//         az: abc.az,
//         manga: {}
//     }
//     abc.az.forEach((x, i) => {
//         obj.manga[x.toLowerCase()] = abc.manga.filter(j => j.url.split('/')[2].startsWith('-') ? '-' + j.url.split('/')[2].replace(/[-]/g, '').toLowerCase().startsWith(x.toLowerCase()) : j.url.split('/')[2].replace(/[-]/g, '').toLowerCase().startsWith(x.toLowerCase()))
//     })
//     return obj
// }

// var a = getListAZ1();
// var b = getListAZ2(a);
// var c = getListAZ3(b)


// fs.writeFileSync('./database/d.json', JSON.stringify(c, null, 2))

// for (let i = 0; i < data.length; i++){
//     var a = data[i].url
//     var b = a.split('/')[2]
//     var c = data[i].title.charAt(0) + b
//     var d = '/' + a.split('/')[1] + '/' + c
//     data[i].url = d
// }

// obj = {
//     "name": "Doraemon",
//     "url": "https://www.mangaeden.com/en/doraemon",
//     "genre": ["Action", "Adventure", "Fantasy"],
//     "age": "12+",
//     "status": "Completed",
//     "views": "1,000,000"
// }
// data[2] = obj


// fs.writeFileSync('./database/a.json', JSON.stringify(data, null, 2))


// var a = JSON.parse(fs.readFileSync('./database/d.json'))

// a.az.forEach((x, i) => {
//     console.log(x)
//     console.log(a.manga[x.toLowerCase()].length)
// })


// var a = getListAZ1();
// var b = getListAZ(a)
// //a = JS.encode(data[0]).()
// // a = JSON.parse((fs.readFileSync('./database/a.txt', 'utf8')))
//var a = listManga(getListAZ1())


// const getListGenre1 = () => {
//     var a = data.map(x => x.genre)
//     var b = a.flat()
//     var c = b.filter((x, i, a) => a.indexOf(x) === i)
//     return c
// }

// const getListGenre = (a, b) => {
//     var hasil = []
//     a.forEach(x => {
//         var c = b.filter(y => y.genre.includes(x))
//         hasil.push({
//             genre: x,
//             manga: c.length
//         })
//     })
//     return hasil
// }

// const advancedSearch = (data, title = '', author = '', status = 'all', type = 'all', genre = 'all') => {
//     var hasil1 = data.filter(x => x.title.toLowerCase().includes(title.toLowerCase()))
//     var hasil2 = hasil1.filter(x => x.studio.toLowerCase().includes(author.toLowerCase()))
//     var hasil3 = status === 'all' ? hasil2 : hasil2.filter(x => status === 'all' ? true : x.status === (status === 'ongo' ? false : true))
//     var hasil4 = hasil3.filter(x => x.type.toLowerCase().includes(type.toLowerCase()))
//     if (genre !== 'all') {
//         var hasil7 = []
//         hasil4.forEach(x => {
//             var hasil6 = x.genre.findIndex(j => j.toLowerCase().includes(genre.toLowerCase()))
//             if (hasil6 != -1) {
//                 hasil7.push(x)
//             } else {

//             }
//         })
//         return hasil7
//     } else {
//         return hasil4
//     }
// }





// const typeA = (data) => {
//     var a = data.map(x => x.type)
//     var c = a.filter((x, i, a) => a.indexOf(x) === i)
//     return c
// }

// const getListAZ = (data) => {
//     if (!data) return false
//     if (data.length < 1) return false
//     let hasil = {
//         az: [],
//         manga: []
//     }
//     data.forEach(x => {
//         //var a = x.url.split('/')[2].startsWith('-') ? '-' : ''
//         //var c = a + x.url.split('/')[2].charAt(0).replace(/[-]/g, '').toUpperCase()
//         var a = x.url.split('/')[2].charAt(0).toUpperCase()
//         var b = hasil.az.indexOf(a);//buat bot dc
//         if (b == -1) {// ok
//             hasil.az.push(a);
//             hasil.manga.push(a + JS.encode(x).toString());
//         } else {
//             hasil.manga.push(a + JS.encode(x).toString());
//         }
//     })
//     hasil.az.sort();
//     hasil.manga.sort();
//     if (hasil.az.length < 1) return false
//     if (hasil.manga.length < 1) return false
//     return hasil
// }




















const axios = require('axios');//iya ngebug terus jer
const cheerio = require('cheerio'); //  pake vps nih
const imageToBase64 = require('image-to-base64');
 

async function getImage(url) {
    return new Promise((resolve, reject) => {
        axios.get(url).then(res => {
            const $ = cheerio.load(res.data);
            let a = [];
            $('.reader-area > img').each(function (i, el) {
                const image = $(el).attr('src');
                imageToBase64(image).then(base64 => {
                    a.push(base64);
                })
            });
            resolve(a);
        })
            .catch(err => {
                reject(err);
            });
    });
}

async function getDoujin() {
    return new Promise((resolve, reject) => {
        axios.get('https://212.32.226.234/manga/how-about-this-pose/').then(res => {
            const $ = cheerio.load(res.data);
            const title = $('.entry-title').text();
            const img = $('.thumb > img').attr('src');
            const rating = $('.ratti').text().trim();
            const type = $('.spe > span:nth-child(3)').text().trim().replace('Type: ', '');
            const studio = $('.spe > span:nth-child(6)').text().trim().replace('Author: ', '');
            const desc = $('.entry-content.entry-content-single').text().trim().replace('Sinopsis: ', '')
            const genre = []
            const ch = []
            $('.genre-info > a').each(function (i, el) {
                genre.push($(el).text().trim())
            })
            $('.scrolling > li').each(function (i, el) {
                var obj = {
                    ch: $(el).find('.epsright > .eps > a > chapter').text().trim(),
                    link: $(el).find('.epsright > .eps > a').attr('href')
                }
                if(obj.ch != '') ch.push(obj)
            }); 
            var obj = {
                title: title,
                img: img,
                rating: rating,
                type: type,
                studio: studio,
                desc: desc,
                genre: genre,
                ch: ch
            }
            resolve(obj);
        })
    })
}


const run = () => {
    // //getImage('https://212.32.226.234/2020/06/26/chijoku-no-majo-jeanne-alter-fukujuu-maryoku-kyoukyuu/').then(console.log)
    // var a = ['https://images2.imgbox.com/e1/f7/WpF4Yiz6_o.jpg', 'https://images2.imgbox.com/54/5c/xEAxQZK9_o.jpg', 'https://images2.imgbox.com/27/95/oTJpENh1_o.jpg', 'https://images2.imgbox.com/ce/a3/Y7615FWk_o.jpg','https://images2.imgbox.com/f1/43/FDv7dVro_o.jpg','https://images2.imgbox.com/b5/07/29091bd2_o.jpg',  'https://images2.imgbox.com/7a/88/ZJzbZpZQ_o.jpg',  'https://images2.imgbox.com/a2/d4/mMgqSTMN_o.jpg', 'https://images2.imgbox.com/0c/d8/RFFytoPv_o.jpg', 'https://images2.imgbox.com/be/5e/CDQerxtL_o.jpg', 'https://images2.imgbox.com/4a/81/wE5J6y8k_o.jpg', 'https://images2.imgbox.com/a1/d3/aRvFdVAK_o.jpg']
    // let b = []
    // a.forEach(x => {
    //     imageToBase64(x).then(base64 => {
    //         b.push({ url: 'data:image/png;base64,'+base64 });
    //         fs.writeFileSync('./database/d.json', JSON.stringify(b, null, 2))
    //     })
    // })
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
    console.log(toUrl('aNukitashi – nuki ge mitaina shima ni sun deru watashi wa dou surya iidesu ka?'))
}
run()
