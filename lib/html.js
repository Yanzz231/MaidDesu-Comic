const moment = require('moment')
const ms = (milliseconds) => {
        if (typeof milliseconds !== 'number') {
            throw new TypeError('Expected a number');
        }
    
        const roundTowardsZero = milliseconds > 0 ? Math.floor : Math.ceil;
    
        return {
            days: roundTowardsZero(milliseconds / 86400000),
            hours: roundTowardsZero(milliseconds / 3600000) % 24,
            minutes: roundTowardsZero(milliseconds / 60000) % 60,
            seconds: roundTowardsZero(milliseconds / 1000) % 60,
            milliseconds: roundTowardsZero(milliseconds) % 1000,
            microseconds: roundTowardsZero(milliseconds * 1000) % 1000,
            nanoseconds: roundTowardsZero(milliseconds * 1e6) % 1000
        };
}
var xssFilters = require('xss-filters');
const Encodr = require('encodr')
const JS = new Encodr("json")

const toTime = (time) => {
    if (moment(time).fromNow().includes('seco')) {
        return Math.abs(ms(parseInt(time) - Date.now()).seconds)
    } else {
        if (moment(time).fromNow().includes('minu')) {
            return moment(time).fromNow().split(/\s/)[0] + ' menit lalu'
        } else {
            if (moment(time).fromNow().includes('hour')) {
                return moment(time).fromNow().split(/\s/)[0] + ' jam lalu'
            } else {
                if (moment(time).fromNow().includes('day')) {
                    return moment(time).fromNow().split(/\s/)[0] + ' hari lalu'
                } else {
                    if (moment(time).fromNow().includes('mont')) {
                        return moment(time).fromNow().split(/\s/)[0] + ' bulan lalu'
                    } else {
                        if (moment(time).fromNow().includes('year')) {
                            return moment(time).fromNow().split(/\s/)[0] + ' tahun lalu'
                        } else {
                            return 'tidak diketahui'
                        }
                    }
                }
            }
        }
    }
}

const indexPage = (main, page, setting) => {
    return `<html xmlns="http://www.w3.org/1999/xhtml" lang="id-ID">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="revisit-after" content="1 days" />
    <meta name="rating" content="general" />
    <meta name="distribution" content="global" />
    <meta name="target" content="global" />
    <meta content="All-Language" http-equiv="Content-Language" />
    <meta name="DC.title" content="${setting.title}" />
    <meta name="keywords" content="${setting.desc}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <link media="all" href="/wp-content/css/autoptimize_8d94e8dcf740c6d72fb322183874c1be.css" rel="stylesheet" />
    <title>${setting.title}</title>
    <meta name="description" content="${setting.title}" />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="canonical" href="${setting.url}" />
    <meta property="og:locale" content="id_ID" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${setting.name}" />
    <meta property="og:description" content="${setting.title}" />
    <meta property="og:url" content="${setting.url}" />
    <meta property="og:site_name" content="${setting.name}" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://code.iconify.design/2/2.2.1/iconify.min.js"></script>
    <meta name="google-site-verification" content="Ip2Vn-wqNvyDjlHYaJbeRHvAesIZo-zzt9U5SI1Gzm8" />
    <link rel="dns-prefetch" href="//s.w.org" />
    <script defer="" type="text/javascript" src="/wp-content/themes/Manga/assets/js/sweetalert2.all.min.js" id="Sweetalert JS-js"></script>
    <script defer="" type="text/javascript" src="/wp-content/themes/Manga/assets/js/jquery.min.js" id="jquery-js"></script>
    <script defer="" type="text/javascript" src="/wp-content/plugins/favorites/assets/js/favorites.min.js" id="favorites-js"></script>
    <meta name="generator" content="WordPress 6.0" />
    <link rel="icon" href="${setting.icon['32']}" sizes="32x32" />
    <link rel="icon" href="${setting.icon['192']}" sizes="192x192" />
    <link rel="apple-touch-icon" href="${setting.icon['180']}" />
    <meta name="msapplication-TileImage" content="${setting.icon['270']}" />
    <script src="/socket.io/socket.io.js"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin="true" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Mulish:wght@200;300;400;500;600;700;800;900&amp;display=swa" />
    <link rel="stylesheet" href="/wp-content/css/style.css" />
</head>

<body data-rsssl="1" class="dark" style="" _c_t_common="1">
    <header class="header">
        <div class="container">
            <div class="header-menu">
                <input id="showmenu" type="checkbox" role="button" />
                <label class="showmenu" for="showmenu">
                    <i class="material-icons">menu</i>
                </label>
                <div class="header-logo">
                    <a href="${setting.url}" title="${setting.name}" rel="home">
                    <img src="${setting.logo.ori}" alt="${setting.name}" title="${setting.name}" rel="home" /></a>
                </div>
                <ul id="navigation" class="header-navigation">
                    <li id="menu-item-7560"
                        class="${page === 'home' ? 'menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-home menu-item-7560' : 'menu-item menu-item-type-post_type menu-item-object-page menu-item-7560'}">
                        <a href="${setting.url}">Home</a>
                    </li>
                    <li id="menu-item-36204"
                        class="${page === 'manga' ? 'menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-home menu-item-36204' : 'menu-item menu-item-type-post_type menu-item-object-page menu-item-36204'}">
                        <a href="/manga-list/">Manga List</a>
                    </li>
                    <li id="menu-item-20204"
                        class="${page === 'donasi' ? 'menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-home menu-item-20204' : 'menu-item menu-item-type-post_type menu-item-object-page menu-item-20204'}">
                        <a href="/${setting.trakteer}/">Donasi</a>
                    </li>
                    <li id="menu-item-21078"
                        class="menu-item menu-item-type-custom menu-item-object-custom menu-item-21078">
                        <a href="https://justpaste.it/68fdo">Lapor</a>
                    </li>
                    <li id="menu-item-26996"
                        class="menu-item menu-item-type-custom menu-item-object-custom menu-item-26996">
                        <a href="https://justpaste.it/4h6i0">Join Us!</a>
                    </li>
                    <li id="menu-item-36205"
                        class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-36205">
                        <a href="#">More 
                            <i class="material-icons">arrow_drop_down</i>
                        </a>
                        <ul class="sub-menu">
                            <li id="menu-item-20241"
                                class="menu-item menu-item-type-post_type menu-item-object-page menu-item-20241">
                                <a href="/advanced-search/">Adv. Search</a>
                            </li>
                            <li id="menu-item-27081"
                                class="menu-item menu-item-type-post_type menu-item-object-page menu-item-27081">
                                <a href="/genre-list/">Genre List</a>
                            </li>
                            <li id="menu-item-37043"
                                class="menu-item menu-item-type-custom menu-item-object-custom menu-item-37043">
                                <a href="/advanced-search?type=Doujin">Doujin List</a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <input id="showsearch" type="checkbox" role="button" />
                <label class="showsearch" for="showsearch"><i class="material-icons">search</i></label>
                <div class="header-right">
                    <div class="header-searchbar">
                        <form action="/search" id="form" method="get" itemprop="potentialAction"
                            itemscope="" itemtype="http://schema.org/SearchAction">
                            <meta itemprop="target" content="/search?q={query}" />
                            <input class="search" id="search" onkeyup="fetchResults()" itemprop="query-input"
                                type="text" placeholder="Search..." aria-label="Search" name="q" autocomplete="off" />
                        </form>
                        <div id="datafetch">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    ${main}
    <div class="ads">
        <div class="trakteer-overlay">
            <a href="${setting.trakteer}" target="_blank"><img id="wse-buttons-preview"
                    src="https://cdn.trakteer.id/images/embed/trbtn-red-1.png" style="border: 0px; height: 40px"
                    alt="Trakteer Saya" height="40" /></a>
        </div>
    </div>
    <footer>
        <div class="footertop">
            <div class="container">
                <div class="footertop-left">
                    <a href="${setting.url}" title="${setting.name}" rel="home"><img
                            src="${setting.logo.gray}" alt="${setting.name}"
                            title="${setting.name}" rel="home" /></a>
                </div>
            </div>
        </div>
        <ul id="footermenu" class="footer-navigation">
            <li id="menu-item-34431"
                class="menu-item menu-item-type-post_type menu-item-object-page menu-item-privacy-policy menu-item-34431">
                <a href="/privacy-policy/">Privacy Policy</a>
            </li>
            <li id="menu-item-34430" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-34430">
                <a href="/disclaimer/">Disclaimer</a>
            </li>
            <li id="menu-item-34429" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-34429">
                <a href="/iklan/">Ads</a>
            </li>
            ${setting.dc ? `<li id="menu-item-34432" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-34432"><a href="${setting.dc}">Discord</a></li>` : ``}
            <li id="menu-item-34452" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-34452">
                <a href="${setting.trakteer}/">Trakteer</a>
            </li>
        </ul>
        <div class="copyright">
            © Copyright 2022 - ${setting.name}. All rights reserved.            
        </div>
    </footer>
    <script defer="" type="text/javascript"
        src="/wp-content/js/autoptimize_single_b460f3e81ba63bfac78933670036ac69.js"
        id="disqus_count-js"></script>
    <div id="shadow"></div>
    <a href="#" class="scrollToTop"><i class="material-icons">arrow_drop_down</i></a>
    <!-- Page generated by LiteSpeed Cache 4.6 on 2022-06-18 20:44:23 -->    
    <script async="" type="text/javascript" src="/wp-content/js/script.js"></script>
</body>
</html>`
}

const mainDash = (popular, last, page, setting) => {
    return `<main>
    <div class="content">
        ${setting.nontif ? `<div class="notif"><div class="container">${setting.nontif}</div></div>` : ``}
            <div class="popular">
            <div class="container">
                <h2><span>Popular</span> Manga</h2>
                <div class="flexbox">
                    ${popular}
                </div>
            </div>
        </div>
        <div class="iniiklan">
            <a href="${setting.trakteer}">
                <img src="${setting.imgtrakteer}" title="Donasi" alt="${setting.name}" border="none" />
            </a>
        </div>
        <div class="container">
            <h2><span>Latest</span> Update</h2>
            <div class="flexbox4">
                ${last}
            </div>
            <div class="pagination">
                ${page}
          </div>
      </div>
  </div>
</main>`
}

const searchMain = (hasil, q, page, setting) => {
    text2 = `<main>
    <div class="content">
        <div class="container">
            <h2><span>Search result for</span> ${xssFilters.inHTMLData(q)}</h2>
            <div class="pagenon">
                <h2>No Post Found</h2> <span>404 Not Found</span> <br> <a href="${setting.url}"
                    title="${setting.name}" rel="home">Home</a>
            </div>
            <div class="pagination">${page}</div>
        </div>
    </div>
</main>`
    if (!hasil || hasil.length < 1) return text2
    return `<main>
    <div class="content">
        <div class="container">
            <h2><span>Search result for</span> ${xssFilters.inHTMLData(q)}</h2>
            <div class="flexbox2">
                ${hasil}
            </div>
            <div class="pagination"> 
                ${page}
            </div>
        </div>
    </div>
</main>`
}

const search = (hasil) => {
    p = ''
    hasil.forEach(x => {
        p += `<div class="flexbox2-item">
        <div class="flexbox2-content"> 
            <a href="${x.url}" title="${x.title}">
                <div class="flexbox2-thumb"> 
                    <img src="${x.img}" alt="${x.title}" title="${x.title}">
                    <div class="flexbox2-title">
                        <span class="title">${x.title}</span>
                        <span class="studio">${x.studio}</span>
                    </div>
                </div>
            </a>
            <div class="flexbox2-side">
                <div class="type ${x.type}">${x.type[0].toUpperCase()}${x.type.slice(1)}</div>
                <div class="info">
                    <div class="score"><i style="color: yellow" class="material-icons">star</i> ${x.rating}</div>
                    <div class="season">Ch. ${x.chapter.length}${x.status ? ' [End]' : ''}</div>
                </div>
                <div class="synops">
                    <p>${x.desc}</p>
                </div>
                <div class="genres">
                    <span>
                        ${genreHtml(x.genre)}
                    </span>
                </div>
            </div>
        </div>
    </div>`
    })
    return p
}

const genreHtml = (genre) => {
    p = ''
    genre.forEach((y, i) => {
        p += `<a href="/genres/${y.toLowerCase()}/" rel="tag">${y.toLowerCase()}</a>` + i < genre.length - 1 ? ', ' : ''
    })
    return p
}

const popularList = (data) => {
    p = ''
    c = 0
    data.forEach((x, i) => {
        c++
        if (c >= 7) return p
        p += `<div class="flexbox-item">
  <a href="${x.url}" title="${x.title}">
    <div class="flexbox-thumb">
      <img src="${x.img}" alt="${x.title}" title="${x.title}">
      <div class="flexbox-number">${i + 1}</div>
    </div>
    <div class="flexbox-title"> ${x.title}</div>
  </a>
</div>`
    })
    return p
}

const lastUpdate = (data, n = 16) => {
    p = ''
    c = 0    
    data.forEach((x, i) => {
        c++
        if (c >= parseInt(n)) return p
        p += `<div class="flexbox4-item">
    <div class="flexbox4-content"> 
        <a href="${x.url}" title="${x.title}">
            <div class="flexbox4-thumb"> 
                <img src="${x.img}" alt="${x.title}" title="${x.title}">
                <span class="type ${x.type}">${x.type[0].toUpperCase()}${x.type.slice(1)}</span>
            </div>
        </a>
        <div class="flexbox4-side">
            <div class="title">
            <a href="${x.url}">${x.title}</a>
        </div>
        <ul class="chapter">        
        ${!x.last[2] ? '' : `<li><a href="${x.last[2].url}">Ch. ${x.last[2].chapter}${x.status ? ' [End]' : ''}</a> <span class="date">${toTime(x.last[2].time)} </span></li>` }
        ${!x.last[1] ? '' : `<li> <a href="${x.last[1].url}">Ch. ${x.last[1].chapter}${!x.last[2] ? x.status ? ' [End]' : '' : ''}</a><span class="date">${toTime(x.last[1].time)} </span></li>` }
        ${!x.last[0] ? '' : `<li><a href="${x.last[0].url}">Ch. ${x.last[0].chapter}${!x.last[1] ? x.status ? ' [End]' : '' : ''}</a><span class="date">${toTime(x.last[0].time)} </span></li>` }
        </ul>
    </div>
</div>
</div>`
    })
    return p
}

const errorPage = (mess1, mess2, setting) => {
    return `<main>
    <div class="content">
        <div class="container">
            <div class="pagenon">
                <h2>${mess1}</h2> <span>${mess2}</span> <br> 
                <a href="/" title="${setting.name}" rel="home">Home</a>
            </div>
        </div>
    </div>
</main>`
}

const liveSearch = (data) => {
    p = ''
    c = 0
    data.forEach((x, i) => {
        c++
        if (c >= 6) return p
        p += `<div class="searchbox">
    <a href="${x.url}" title="${x.title}">
        <div class="searchbox-thumb">
            <img src="${x.img}" alt="${x.title}" title="${x.title}">
        </div>
        <div class="searchbox-side">
            <div class="searchbox-title">${x.title}</div>
            <div class="info">
                <div class="type ${x.type}">${x.type[0].toUpperCase()}${x.type.slice(1)}</div>
                <div class="status ${x.status ? 'Completed' : 'Ongoing' }">${x.status ? 'Completed' : 'Ongoing'}</div>
            </div>
        </div>
    </a>
</div>`
    })
    return p
}

const pageGen = (tpage, page, type) => {
    if (isNaN(parseInt(page)) || parseInt(page) === NaN) {
        page = 1
    }
    p = ''
    p += (parseInt(page) - 1) >= 1 ? `<a class="prev page-numbers" href="${type}${parseInt(page) - 1}">« Sebelumnya</a>` : ''
    p += (parseInt(page) - 3 >= 1) ? `<a class="page-numbers" href="${type}1">1</a>` : ''
    p += (parseInt(page) - 4 >= 1) ? '<span class="page-numbers dots">…</span>' : ''
    p += (parseInt(page) - 2) >= 1 ? `<a class="page-numbers" href="${type}${parseInt(page) - 2}">${parseInt(page) - 2}</a>` : ''
    p += (parseInt(page) - 1) >= 1 ? `<a class="page-numbers" href="${type}${parseInt(page) - 1}">${parseInt(page) - 1}</a>` : ''
    p += `<span class="page-numbers current">${parseInt(page)}</span>`
    p += (parseInt(page) + 1) <= parseInt(tpage) ? `<a class="page-numbers" href="${type}${parseInt(page) + 1}">${parseInt(page) + 1}</a>` : ''
    p += (parseInt(page) + 2) <= parseInt(tpage) ? `<a class="page-numbers" href="${type}${parseInt(page) + 2}">${parseInt(page) + 2}</a>` : ''
    p += (parseInt(page) + 4) <= parseInt(tpage) ? '<span class="page-numbers dots">…</span>' : ''
    p += (parseInt(page) + 3) <= parseInt(tpage) ? `<a class="page-numbers" href="${type}${tpage}">${tpage}</a>` : ''
    p += (parseInt(page) + 1) <= parseInt(tpage) ? `<a class="next page-numbers" href="${type}${parseInt(page) + 1}">Berikutnya »</a>` : ''
    return p
}

const epsList = (data) => {
    if (!data) return false
    if (!data.chapter) return false
    if (data.length < 1) return false
    if (data.chapter.length < 1) return false
    p = ''
    for (let i = data.chapter.length - 1; i >= 0; i--) {
        p += `<li>
    <div class="flexch">
        <div class="flexch-book">
            <i class="material-icons">menu_book</i>
        </div>
        <div class="flexch-infoz"> 
            <a href="${data.url}/${data.chapter[i].chapter}" title="${data.title} Chapter ${data.chapter[i].chapter}${data.status && i === data.chapter.length - 1 ? ' (Tamat)' : ''}">
                <span>Chapter ${data.chapter[i].chapter}${data.status && i === data.chapter.length - 1 ? ' (Tamat)' : ''}
                    <span class="date">${moment(data.chapter[i].time).format('LL')}</span>
                </span>
            </a>
        </div>
    </div>
</li>`
    }
    return p
}

const listImage = (data, chap) => {
    p = ''
    if (!data) return false
    if (!chap) return false
    if (!data.chapter) return false
    if (data.chapter.length < 1) return false
    var indexDB = data.chapter.findIndex(x => x.chapter === parseInt(chap))
    if (indexDB === -1) return false
    data.chapter[indexDB].image.forEach((x, i) => {
        p += `<a href="${x.url}" target="_blank" rel="noopener">
    <img src="${x.url}" alt="image host">
</a>`
    })
    return p
}

const epsListM = (data, chap) => {
    if (!data) return false
    if (!data.chapter) return false
    if (data.length < 1) return false
    if (data.chapter.length < 1) return false
    p = ''
    data.chapter.forEach((x, i) => {
        p += `<li> 
    <span class="nomor">${x.chapter}</span> 
    <a class="chapzx${parseInt(chap) === x.chapter ? ' active' : ''}" href="${data.url}/${x.chapter}" title="${data.title} Chapter ${x.chapter}">
        <chx>Chapter ${x.chapter}</chx>
    </a> <span class="datez">${moment(x.time).format('LL')}</span>
</li>`
    })
    return p
}

const infoManga = (data) => {
    cap = data.chapter.length ? data.chapter.length : 1
    return `<main>
    <div class="content" itemscope="" itemtype="http://schema.org/Product">
        <div class="series">
            <div class="series-cover">
                <div class="series-bg" style="background-image:url(${data.img});"></div>
            </div>
            <div class="container">
                <div class="series-flex">
                    <div class="series-flexleft">
                        <div class="series-thumb">
                            <img src="${data.img}" alt="${data.title}" title="${data.title}">
                        </div>
                        <div class="series-info">
                            <div class="series-titlex">
                                <h2>${data.title}</h2><span></span>
                            </div>
                            <div class="series-infoz block">
                                <span class="type ${data.type}">${data.type[0].toUpperCase()}${data.type.slice(1)}</span>
                                <span class="status ${data.status ? 'Completed' : 'Ongoing'}">${data.status ? 'Completed' : 'Ongoing'}</span>
                            </div>
                            <div class="series-infoz score" itemprop="aggregateRating" itemscope="" itemtype="http://schema.org/AggregateRating">
                                <i class="material-icons">star</i>
                                <span itemprop="ratingValue">${data.rating}</span>
                                <span itemprop="ratingCount" style="display: none"></span>
                                <meta itemprop="bestRating" content="10">
                                <meta itemprop="worstRating" content="1">
                            </div> 
                            <ul class="series-infolist">
                                <li><b>Published</b><span>${moment(data.time).format('LL')}</span></li>
                                <li><b>Author</b><span>${data.studio}</span></li>
                                <li><b>Total Chapter</b><span class="chapter">${data.status ? data.chapter.length : '?'} Chapter</span></li>
                            </ul>
                        </div>
                    </div>
                    <div class="series-flexright">
                        <div class="series-title">
                            <h2>${data.title}</h2><span></span>
                        </div>
                        <div class="series-genres">
                            ${genreHtml(data.genre)}
                        </div>
                        <div class="series-synops">
                            <p>${data.desc}</p>
                        </div>
                        <div class="iniiklan">
                            <a href="https://discordapp.com/invite/Gu5KbjU">
                                <img src="https://images2.imgbox.com/73/6f/N2mBh2kT_o.png" alt="Discord" title="Discord">
                            </a>
                        </div>
                        <div class="series-chapter">
                            <h2><span>Chapter</span> List</h2>
                            <ul class="series-chapterlist">
                                ${epsList(data)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>`
}

const readManga = (data, listeps, listimage, chap, config) => {
    var eps = data.chapter.findIndex(x => x.chapter === parseInt(chap))
    if (eps === -1) return false
    return `<main>
    <div class="content">
        <h2 class="title-chapter">${data.title} Chapter ${chap}</h2>
        <div id="chapnav" class="navi-chapter">
            <div class="content"> <a href="${data.url}">
                    <div class="thumb"> <img src="${data.img}"
                            alt="${data.title} Chapter ${chap}"
                            title="${data.title} Chapter ${chap}"></div>
                </a>
                <div class="infox"> <span class="title"><a
                            href="${data.url}">${data.title}</a></span>
                    <span class="chapter">Chapter ${chap}</span> <span class="date">• ${moment(data.chapter[eps].time).format('LL')}</span></div>
                <div class="navigation">
                    <div class="chselect"><a onclick="openNavx()"><i class="material-icons">list</i></a></div>
                    ${parseInt(chap) - 1 > 0 ? `<div class="leftnav"><a href="${data.url}/${parseInt(chap) - 1}" rel="prev"><i class="material-icons">west</i></a></div>` : ''}
                    ${parseInt(chap) + 1 <= data.chapter.length ? `<div class="rightnav"><a href="${data.url}/${parseInt(chap) + 1}" rel="next"><i class="material-icons">east</i></a></div>` : ''}
                </div>
            </div>
        </div>
        <div class="container">
            <div class="iniiklan"><a style="pointer-events:auto" href="${config.trakteer}"><img
                        src="${config.imgtrakteer}" title="Donasi" alt="${config.name}"
                        border="none"></a></div>
            <div class="reader-area">
                <p>
                    ${listimage}
                </p>
            </div>
        </div>
    </div>
    <div id="chSidenav" class="sidenav chaplist"> <a href="javascript:void(0)" class="closebtn" onclick="closeNavx()"><i
                class="material-icons">close</i></a> <span class="titlex">
            <h2>Chapter List</h2>
        </span>
        <ul id="chxlistz" class="chapx">
            ${listeps}
        </ul>
    </div>
</main>`
}

const listAZ = (data) => {
    p = ''
    for (let i = 0; i < data.length; i++) {
        p += `<a href="#${data[i]}">${data[i]}</a>`
    }
    return p
}

const listManga = (data) => {
    if(!data) return false
    tanda = data.az[0]
    p = `<div class="mangalist-blc"><span><a name="${data.az[0]}">${data.az[0]}</a></span>
    <ul>`
    data.manga.forEach((x, i) => {
        var a = JS.decode(x.substring(1))
        tanda === x.charAt(0)
        if (tanda != x.charAt(0)) {
            p += `</ul></div>`
            p += `<div class="mangalist-blc"><span><a name="${x.charAt(0)}">${x.charAt(0)}</a></span>
            <ul>`
            tanda = x.charAt(0)
            p += `<li class="${a.type.charAt(0).toUpperCase()}${a.type.slice(1)}">
        <a class="series" rel="${i}" href="${a.url}">${a.title}</a>
    </li>`
        }else{
            p += `<li class="${a.type.charAt(0).toUpperCase()}${a.type.slice(1)}">
        <a class="series" rel="${i}" href="${a.url}">${a.title}</a>
    </li>`
        }
    })
    p += `</ul>
</div>`
    return p
}

const MangaList = (data, manga) => {
    return `<main>
    <div class="content">
        <div class="container">
            <h2><span>Manga</span> List</h2>
            <div class="mangalist">
                <div class="mangalist-nav">
                    ${listAZ(data.az)}
                </div>
            </div>
            ${manga}
        </div>
    </div>
</main>`
}

const genre = (data) => {
    p = ''
    data.forEach(x => {
        p += `<li>
        <a href="/genre-list/${x.genre}/" title="Lihat Anime ${x.genre}">${x.genre}<span>${x.manga}</span></a>
    </li>`
    })
    return p
}

const genreList = (a) => {
    return `<main>
    <div class="content">
        <div class="container">
            <h2><span>Genre</span> List</h2>
            <ul class="achlist">
                ${genre(a)}
            </ul>
        </div>
    </div>
</main>`
}

const genrePage = (data, genre, page) => {
    return `<main>
    <div class="content">
        <div class="container">
            <h2><span>Archive for</span> ${xssFilters.inHTMLData(genre)}</h2>
            <div class="flexbox2">${search(data)}</div>
            <div class="pagination">${page}</div>
        </div>
    </div>
</main>`
}

const typeA = (data, obj) => {
    var a = data.map(x => x.type)
    var c = a.filter((x, i, a) => a.indexOf(x) === i)
    var d = ''
    c.forEach(x => {
        d += `<div class="custom-control custom-radio">
            <input class="custom-control-input" id="mangatype" type="radio" value="${x.toLowerCase()}" name="type"${obj.type && obj.type === x.toLowerCase() ? `checked="" ` : ''}>
            <label class="custom-control-label" for="mangatype">${x.charAt(0).toUpperCase()}${x.slice(1)}</label>
        </div>`    
    })
    return d
}

const genreA = (data, obj) => {
    var a = data.map(x => x.genre)
    var b = a.flat()
    var c = b.filter((x, i, a) => a.indexOf(x) === i)
    var d = ''
    c.forEach(x => {
        d += `<div class="custom-control custom-checkbox">
        <input type="checkbox" class="custom-control-input" id="${x}" name="genre" value="${x.toLowerCase()}"${obj.genre && obj.genre === x.toLowerCase() ? ` checked=""` : ''}>
        <label class=" custom-control-label" for="${x}">${x.charAt(0).toUpperCase()}${x.slice(1)}</label>
    </div>`    
    })
    return d
}

const indexAdvS = (data, obj, page, hasil) => {
    return `<main>
    <div class="content">
        <div class="container">
            <h2><span>Advanced</span> Search</h2>
            <div class="advancedsearch">
                <form action="/advanced-search/" method="GET">
                    <table width="100%">
                        <tbody>
                            <tr>
                                <td class="lbl">Title</td>
                                <td class="lbx"><input type="text" class="form-control" name="title" ${obj.title ? `value="${obj.title}" ` : ''}autocomplete="off"></td>
                            </tr>
                            <tr>
                                <td class="lbl">Author</td>
                                <td class="lbx"><input type="text" class="form-control" name="author" ${obj.author ? `value="${obj.author}" ` : ''}autocomplete="off"></td>
                            </tr>
                            <tr>
                                <td class="lbl">Status</td>
                                <td class="lbx">
                                    <div class="custom-control custom-radio">
                                        <input class="custom-control-input" id="allstats" type="radio" value="" name="status" ${obj.status && obj.status === 'all' || obj.status === null || obj.status === '' ? `checked=""` : ''}>
                                        <label class="custom-control-label" for="allstats">All</label>
                                    </div>
                                    <div class="custom-control custom-radio">
                                        <input class="custom-control-input" id="ongostats" type="radio" value="ongo" name="status" ${obj.status && obj.status === 'ongo' ? `checked=""` : ''}>
                                        <label class="custom-control-label" for="ongostats">Ongoing</label>
                                    </div>
                                    <div class="custom-control custom-radio">
                                        <input class="custom-control-input" id="compstats" type="radio" value="end" name="status" ${obj.status && obj.status === 'end' ? `checked=""` : ''}>
                                        <label class="custom-control-label" for="compstats">Completed</label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="lbl">Type</td>
                                <td class="lbx">
                                    <div class="custom-control custom-radio">
                                        <input class="custom-control-input" id="mangatype" type="radio" value="" name="type"${obj.type && obj.type === 'all' || obj.type === null || obj.type === ''  ? `checked="" ` : ''}>
                                        <label class="custom-control-label" for="mangatype">All</label>
                                    </div>
                                    ${typeA(data, obj)}
                                </td>
                            </tr>
                            <tr class="gnrx">
                                <td class="lbl">Genre</td>
                                <td class="lbx">                                    
                                    ${genreA(data, obj)}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="gnr">Show/Hide Genre</div><button type="submit" class="btn">Search</button>
                </form>
            </div>
            <div class="flexbox2">${hasil ? hasil : ''}</div>
            ${page ? `<div class="pagination ">${page}</div>` : ''}
        </div>
    </div>
</main>`
}


module.exports = {
    html: {
        indexPage,
        popularList,
        lastUpdate,
        mainDash,
        searchMain,
        search,
        errorPage,
        liveSearch,
        toTime,
        infoManga,
        pageGen,
        readManga,
        listImage,
        epsListM,
        listManga,
        MangaList,
        genrePage, 
        genreList,
        indexAdvS
    }
}