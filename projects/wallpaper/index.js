const console = require('console');
const fs = require('fs')
// const path = require('path')
const { ipcRenderer } = require('electron');
const { Promise, setTimeout } = require('globalthis/implementation');

// ipcRenderer.on('get-data', (e, arg) => {
//     console.log(arg);
// })

// ipcRenderer.send('exper-action', 'msg from page');

var width = screen.width;
var height = screen.height;

const card_width = 213;

var cols = Math.round(width / card_width);
var imgWidth = Math.floor(width / cols);

var doms = [];

function get_dom(url) {
    var box = document.createElement("div");
    box.className = "img-box";
    var imgdom = document.createElement("img");
    imgdom.src = url;
    imgdom.style.width = `${imgWidth}px`;
    imgdom.className = 'img back';
    var bg = document.createElement("div");
    bg.className = "img-bg front";
    box.appendChild(imgdom);
    box.appendChild(bg);
    return box;
}

function init_images() {
    urls.forEach(url => {
        var dom = get_dom(url);
        doms.push(dom);
    });
}

function clear_screen() {
    var images = document.getElementById("images");
    while(images.hasChildNodes()) {
        images.removeChild(images.firstChild);
    }
}

function add_images() {
    var images = document.getElementById("images");
    doms = doms.sort(function() {
        return .5 - Math.random();
    });
    doms.forEach(dom => {
        images.appendChild(dom);
    });
}

function is_dom_in_viewport(dom) {
    var rect = dom.getBoundingClientRect();
    return (
        rect.top >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight)
    );
}

function display_dom(dom) {
    dom.style.display = "block";
}

function undisplay_dom(dom) {
    dom.style.display = "none";
}

function flip_front(dom) {
    // 生成一个0~2s的随机时间
    var delay = Math.random() * 2000;
    setTimeout(() => {
        dom.children[0].className = 'img front';
        dom.children[1].className = 'img-bg back';
    }, delay);
}

function flip_back(dom) {
    // 生成一个0~2s的随机时间
    var delay = Math.random() * 2000;
    setTimeout(() => {
        dom.children[0].className = 'img back';
        dom.children[1].className = 'img-bg front';
    }, delay);
}

function all_flip_front() {
    return new Promise((resolve, reject) => {
        doms.forEach(dom => {
            if(is_dom_in_viewport(dom)) {
                display_dom(dom);
                flip_front(dom);
            } else {
                undisplay_dom(dom);
            }
        });
        setTimeout(() => {
            resolve();
        }, 3500);
    });
}

function all_flip_back() {
    return new Promise((resolve, reject) => {
        doms.forEach(dom => {
            if(is_dom_in_viewport(dom)) {
                display_dom(dom);
                flip_back(dom);
            } else {
                undisplay_dom(dom);
            }
        });
        setTimeout(() => {
            resolve();
        }, 3500);
    });
}

function background_begin() {
    init_images();
    add_images();

    var interval = setInterval(() => {
        var loaded_count = 0;
        for(let i = 0; i < doms.length; i++) {
            if(doms[i].children[0].complete) {
                doms[i].style.width = `${imgWidth}px`;
                doms[i].style.height = doms[i].children[0].offsetHeight + 'px';
                doms[i].children[1].style.width = `${imgWidth}px`;
                doms[i].children[1].style.height = doms[i].children[0].offsetHeight + 'px';
                loaded_count += 1;
            }
        }
        // console.log(loaded_count, doms.length);
        if(loaded_count == doms.length) {
            waterfall('#images');
            clearInterval(interval);
            all_flip_front();
            setInterval(() => {
                all_flip_back().then(() => {
                    clear_screen();
                    add_images();
                    waterfall('#images');
                    all_flip_front();
                });
            }, 60000);
        }
    }, 1000);
}

const devFolder = './images'
const relFolder = './resources/app/images'
var urls = [];

try {
    if (fs.existsSync(devFolder)) {
        urls = fs.readdirSync(devFolder).map(fileName => {
            return devFolder + '/' + fileName;
        });
        background_begin();
    }
    if (fs.existsSync(relFolder)) {
        urls = fs.readdirSync(relFolder).map(fileName => {
            return devFolder + '/' + fileName;
        });
        background_begin();
    }
} catch (err) {
    console.error(err)
}

function shake_little_begin() {
    if(!$('#fans-count').hasClass('shake-little')) {
        $('#fans-count').addClass('shake-little');
    }
}

var tada_launched = false;

function shake_little_end() {
    tada_launched = true;
    if($('#fans-count').hasClass('shake-little')) {
        $('#fans-count').removeClass('shake-little');
    }
    if(!$('#fans-count').hasClass('animate__tada animate__animated')) {
        $('#fans-count').addClass('animate__tada animate__animated');
    }
}

var fireworks_launched = false;

function fireworks_begin() {
    var fworks = new Fireworks();
    fireworks_launched = true;
    setTimeout(() => {
        fireworks_launched = false;
    }, 110 * 200);
}

function fans_number_begin() {
    var num = -1;
    var numbers = null;
    ipcRenderer.on('fans-num', (e, new_fans_num) => {
        // console.log(new_fans_num);
        // add = Math.round(Math.random() * 100);
        if(num === -1 && new_fans_num === -1) {
            return;
        }
        if(new_fans_num === -1) {
            return;
        }
        if(num === -1) {
            num = new_fans_num
            numbers = $("#numbers").numberAnimate({
                num: num,
                speed: 1000,
                symbol: ","
            });
        } else {
            add = new_fans_num - num;
            step = add / 5;
            final = num + add;
            for(let i = 1; i <= 5; i++) {
                setTimeout(() => {
                    let show;
                    if(i == 5) {
                        show = final;
                        num = final;
                    } else {
                        show = num + step * i;
                    }
                    if(show % 100000 < 1000) {
                        show = Math.floor(show / 100000) * 100000;
                        numbers.resetData(show);
                    } else {
                        numbers.resetData(show);
                    }
                    if(show % 100000 > 99000) {
                        shake_little_begin();
                    }
                    if(!fireworks_launched && show % 100000 === 0) {
                        fireworks_begin();
                    }
                    if(!tada_launched && show % 100000 === 0) {
                        shake_little_end();
                    }
                }, i * 11700);
                // }, i * 3700);
            }
        }
    })
    ipcRenderer.send('fans-num');
    setInterval(function () {
        ipcRenderer.send('fans-num');
    }, 60000);
    // }, 20000);
}

fans_number_begin();