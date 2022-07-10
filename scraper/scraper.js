const axios = require('axios');
const cheerio = require('cheerio'); 
const imageToBase64 = require('image-to-base64');

async function getImage(url) {
    return new Promise((resolve, reject) => {
        axios.get(url).then(res => {
            const $ = cheerio.load(res.data);
            let a = [];
            $('.reader-area > img').each(function (i, el) {
                const image = $(el).attr('src');
                imageToBase64(image).then(base64 => {
                    a.push({ url: base64 });
                })
            });
            resolve(a);
        })
        .catch(err => {
            reject(err);
        });
    });
}
async function getDoujin(url) {// emg kek gitu kah? atau di gw yg ngebug
    return new Promise((resolve, reject) => {// C:\Users\Lenovo\Downloads\web-maid>// pantes blm masuk ke folder nya
        axios.get(url).then(res => { // kok aneh kgk itu lu ke powersheell
            const $ = cheerio.load(res.data); // knp tuh 
            const title = $('.entry-title').text();
            const img = $('.thumb > img').attr('src');
            const rating = $('.ratti').text().trim();
            const type = $('.spe > span:nth-child(3)').text().trim().replace('Type: ', '');
            const status = $('.spe > span:nth-child(2)').text().trim().replace('Status: ', '');
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
                status: status === 'Finished' ? true : false,
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

module.exports = {
    src: {
        getImage: getImage,
        getDoujin: getDoujin
    }
}