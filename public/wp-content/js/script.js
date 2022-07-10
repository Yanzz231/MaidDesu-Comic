function openNavx() {
    document.getElementById("chSidenav").style.width = "280px"
}

function closeNavx() {
    document.getElementById("chSidenav").style.width = "0"
}

const socket = io();

socket.on('search', (data) => {
    var box = document.getElementById('datafetch');
    if (!data) return deleteIfMax(true)
    if (data.length >= 6) return     
    data.forEach(x => {
        deleteIfMax(false)
        var div = document.createElement('div');
        div.className = 'searchbox';
        var a = document.createElement('a');
        a.href = x.url;
        a.setAttribute('title', x.title);
        var div2 = document.createElement('div');
        div2.className = 'searchbox-thumb'
        var img = document.createElement('img');
        img.src = x.img;
        img.alt = x.title;
        img.title = x.title
        div2.appendChild(img);
        var div3 = document.createElement('div');
        div3.className = 'searchbox-side';
        var div4 = document.createElement('div');
        div4.className = 'searchbox-title';
        div4.innerHTML = x.title;
        var div5 = document.createElement('div');
        div5.className = 'info'
        var div6 = document.createElement('div');
        div6.className = 'type' + ' ' + x.type;
        div6.innerHTML = x.type[0].toUpperCase() + x.type.slice(1)
        var div7 = document.createElement('div');
        div7.className = 'status' + ' ' + x.status ? 'Completed' : 'Ongoing'
        div6.innerHTML = x.status ? 'Completed' : 'Ongoing'
        div5.appendChild(div6);
        div5.appendChild(div7);
        div3.appendChild(div5);
        div3.appendChild(div4);
        a.appendChild(div2);
        a.appendChild(div3);
        div.appendChild(a);
        box.appendChild(div);
    })
})

function deleteIfMax(a) {
    if (!a) {
        var box = document.getElementById('datafetch');
        if (box.childElementCount >= 6) {
            for (let i = 5; i > 0; i--) {
                var node = box.querySelectorAll('.searchbox')[i -1];
                box.removeChild(node);
            }
        }
    }else if(a){   
        var box = document.getElementById('datafetch');
        box.remove();
        var se = document.getElementsByClassName('header-searchbar')[0]
        var div = document.createElement('div');
        div.id = 'datafetch';
        se.appendChild(div);
    }
}

function fetchResults() {
    var search = document.getElementById('search').value;
    if (search === '' || search === null || !search) deleteIfMax(true)
    if (search) {
        socket.emit('search', search)
    }
}

// SCROLLER

$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scrollToTop').fadeIn()
        } else {
            $('.scrollToTop').fadeOut()
        }
    });
    $('.scrollToTop').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 100);
        return !1
    })
})


/* <![CDATA[ */
var countVars = {
    "disqusShortname": "MangaDesu - Situs Baca Manga / Doujin Berbahasa Indonesia"
};
/* ]]> */

$(document).ready(function(){
    $(".gnr").click(function(){
             $(".gnrx").toggleClass("shwgx");
    });
 });