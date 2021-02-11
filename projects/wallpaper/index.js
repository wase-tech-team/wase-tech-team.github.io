const console = require('console');
const { ipcRenderer } = require('electron');
const { Promise, setTimeout } = require('globalthis/implementation');

// ipcRenderer.on('get-data', (e, arg) => {
//     console.log(arg);
// })

// ipcRenderer.send('exper-action', 'msg from page');

var width = screen.width;
var height = screen.height;

var cols = 12.0;
var imgWidth = Math.floor(width / cols);

var urls = [
    "https://i0.hdslb.com/bfs/album/12b554f05b45bca651c261a98bf263090bcfb445.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/96e938047e70658257d8232b50b2e19677495a07.gif@518w.gif",
    "https://i0.hdslb.com/bfs/album/a7386dcdd4032b50d3557d499d13095a98fa4e19.png@518w.png",
    "https://i0.hdslb.com/bfs/album/2c77041a82a3a849dc25412cb06401ad0f8eb7d2.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/6b604cd7c6b3f11721681be16f4a44852d50dfdf.png@518w.png",
    "https://i0.hdslb.com/bfs/album/2a279c3cd26d3f9d7ccbd1b422ea04bc3f42ef53.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/92c19fb000f72e697a6262bf2ef778275727a018.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/bdbe470539ddacab4b823e650a08d44c5bccb0ef.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/cef9fe38dbd91ee4d3016f326ba7519539537eda.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/6ecebd902f1b4f6d1ce7a339b351bd29ac4a5ffc.png@518w.png",
    "https://i0.hdslb.com/bfs/album/5bc6d39b8982bef3cdf987975cf853ee65dad098.png@518w.png",
    "https://i0.hdslb.com/bfs/album/e5d493ee4380f152f0d690eb41d81eb4de532bf2.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/e75969d95dad2f0fae6a53d12c45391c28b7d65d.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/a822aa6e26cd4d727aa5689a477b67bc0e4061bc.png@518w.png",
    "https://i0.hdslb.com/bfs/album/48a243147ea7f1139c74605ac012f532af394d3f.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/30e0778e382542cca27d6044a6185838560180a6.gif@518w.gif",
    "https://i0.hdslb.com/bfs/album/b501291694b23ad250958e5d4ad363a2ff107315.gif",
    "https://i0.hdslb.com/bfs/album/3f478debc2a4f1dbfaa960c0bf0683ddbba1050d.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/c5a00dfd4a5724b4963c647b55dad7efef9b84fe.png@518w.png",
    "https://i0.hdslb.com/bfs/album/8cd9413e92b13795ed4a615335e6083e41f7e920.png@518w.png",
    "https://i0.hdslb.com/bfs/album/72bdbdef085f145c712e9548ae563cce4d7f75a3.png",
    "https://i0.hdslb.com/bfs/album/20507353f5412fb482459688f55d1ea82583f90e.gif",
    "https://i0.hdslb.com/bfs/album/9278499c805b37e9b1d785f2674facf14b1cba28.png@518w.png",
    "https://i0.hdslb.com/bfs/album/618ab4784a32c46a4d21ff6867b788cea57b133b.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/2511cffa422a561f18d4c18c793f81ff979d87bb.gif",
    "https://i0.hdslb.com/bfs/album/5a28853a3eb7c973cfd35051a2ea05bbfac17e0e.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/01729c5221a9e583f364d31873ffc6b9122689d9.png@518w.png",
    "https://i0.hdslb.com/bfs/album/13a810c610f393a416d4327b2b34b89162d327aa.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/5a0e48d63e570e83580e434091e8dadf065492fb.png@518w.png",
    "https://i0.hdslb.com/bfs/album/d7e346dd7da4f5218548e23dd258085fcf1953dc.png@518w.png",
    "https://i0.hdslb.com/bfs/album/801938b42b9504d3fdc4ea4d1b021671ab1495b6.png@518w.png",
    "https://i0.hdslb.com/bfs/album/708b480e0c8d26af746b43e6fb619e51dd290ccf.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/7a129b0a21921a1206d28f538f33162f65fb9177.gif@518w.gif",
    "https://i0.hdslb.com/bfs/album/3bee57362d66534769bf711c2f97d9fef8ac81f0.png@518w.png",
    "https://i0.hdslb.com/bfs/album/262fe83c4e37ee96d5c6fddb8560a49a4c3f7ff9.gif",
    "https://i0.hdslb.com/bfs/album/01065c80daf16e7abad3093d9b1ac011501a6939.gif",
    "https://i0.hdslb.com/bfs/album/df3d89eca139b97ef5fafbbd5d28497ed2596437.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/df3d89eca139b97ef5fafbbd5d28497ed2596437.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/5d66761f574c05ff8ed81ad8aec63b21b13b2545.png",
    "https://i0.hdslb.com/bfs/album/e8eff9f11659bbb82473773114ffbb3e9eb938ec.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/ca76c691c72cb90ce45cd43f42a34c2b83a7ecaa.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/1c089e4946bdbe7b856b728ed6c22ccd478bf8c0.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/c75868e4466bc5e0530e15f86c0b2acc53c576af.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/292e24c072a0e5e1e94539ff2bdc19a90b71af60.png@518w.png",
    "https://i0.hdslb.com/bfs/album/3acd662bb70f0db5716227c75c3d7182cb23fe4d.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/8e14ba805a24188fc4aff0d19a56fb8c2416dfb0.png@518w.png",
    "https://i0.hdslb.com/bfs/album/de28b50e200185d82399e6af7983cbbdab217b77.gif",
    "https://i0.hdslb.com/bfs/album/6556976b69e6da9cd58e06cd13f7eb0075eada7b.gif@518w.gif",
    "https://i0.hdslb.com/bfs/album/cbec210a6dd57213fb83dc6042f8856e16c06c1b.png@518w.png",
    "https://i0.hdslb.com/bfs/album/24d6d9d9d5189934eeaaf743fe5010b60ae28cf1.png@518w.png",
    "https://i0.hdslb.com/bfs/album/e160732821e7c6bf10d60fdcab87aa8e62c53aff.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/6c8c70d9d431b20566530a2d49dbd7d1941c3a6e.gif@518w.gif",
    "https://i0.hdslb.com/bfs/album/2e30ee84bbcacd28a3556519bced989b4c00b5fe.png@518w.png",
    "https://i0.hdslb.com/bfs/album/cec746f9ccf5b2df1d315463b08e375825d7e771.png@518w.png",
    "https://i0.hdslb.com/bfs/album/932b727244e2980c4fb6ec98360188cafbd58c32.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/2700d79b310c2f0c4d1ef30e509ba8724ac00cf4.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/f15711ee0c5ac8d9216c09b7bd698c654697a451.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/2b0787fd7328badf2c223de0435decd31d70dfd0.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/62558227b5b6861e82d6dc005d9e00caa671d917.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/980a512c507ec537d1016207631946bba49e50ad.png@518w.png",
    "https://i0.hdslb.com/bfs/album/64055b639651eeaf19622b3332ee98d73c6234a7.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/f56dbb2f19da36c0517f2c2dd220e8e3c5d0d27c.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/b4114b8c40980aff4903a5ad06e78cd7d4a5e6e6.png@518w.png",
    "https://i0.hdslb.com/bfs/album/87ae687b100ed8ed83bcd6a1bf0ef514d87542a4.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/1e1681cea15cf66faf0eba4842a2015c42879146.png@518w.png",
    "https://i0.hdslb.com/bfs/album/fc25b17052cc396433535203bd56f75dc7280f26.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/4b9e1ad8b2b474a98bcfc020f52d30a0d19a1bb3.png@518w.png",
    "https://i0.hdslb.com/bfs/album/2359528599580da1989d5fa109ab13d89c9e4a50.png@518w.png",
    "https://i0.hdslb.com/bfs/album/e68a768e7738480d7291b4023b4c4fc75dfe502f.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/a151009d54accac06ca9ced5abfe7b596df11c4e.png@518w.png",
    "https://i0.hdslb.com/bfs/album/55fd1e6d5ff367ca26eeb63610432af37d82a214.png@518w.png",
    "https://i0.hdslb.com/bfs/album/6b57444a11a5a48f0fce80a55010c2706f3365d1.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/791f628ef07565f44b310c20a2b6140bde3c5195.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/0528d990a322f79ab7c273f1341bcb8c4be1358b.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/b86d21d489db42a2b9a7bee99d6d502ea8bc7337.png@518w.png",
    "https://i0.hdslb.com/bfs/album/d1b5cc447fa8048c6406be2ec7a09af5167014ac.png@518w.png",
    "https://i0.hdslb.com/bfs/album/e105a84f3c6f3772e97022dc9aee604484c7858e.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/d7ea711d3e71c433ecc3ae5a437740d0779b5226.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/864cd61f5be51c35e0dda057bf8d3e538e48d748.png@518w.png",
    "https://i0.hdslb.com/bfs/album/aefaecea36d5eb90be9ab119089bba0ce111ce0b.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/483b1869a11a0d727c8a9cd09105a2a5b63762a1.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/4047cd62a4c33555c113c1881282c2bddef57941.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/3aedb3b5b8103a83824bdeb369b1d47cfd7534a3.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/4f0e29948e3c907f398a5797edc74d159c4e82ef.png@518w.png",
    "https://i0.hdslb.com/bfs/album/9787fc97b585d8529f86af7d64eaf5d69644670b.gif@518w.gif",
    "https://i0.hdslb.com/bfs/album/5c24e998600bdc1106280f5e93f81f274b7038b7.jpg",
    "https://i0.hdslb.com/bfs/album/986ebc49cda4462996a798ed8ca9b89ba0125fd5.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/2c0e3b2c13e9660367ba24f75a0ba579aa9c46b2.gif@518w.gif",
    "https://i0.hdslb.com/bfs/album/ebe0c71d341648b942152593b6d21759e8845280.gif@518w.gif",
    "https://i0.hdslb.com/bfs/album/5cfaa65c151731561194d1f608a490e8f6b256c5.jpg",
    "https://i0.hdslb.com/bfs/album/c08381c3ac76afb327ac1f31e897ae5acc3534bc.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/35142c5b5009bcc523c36225aa0160282d2cee0f.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/b92e4a36fe18954876d4287d50861466e441058d.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/0458bb70cdd38f7f8363b4383df716ecff002bd9.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/b07d68fefef7a9a52e1f4001ab009ebd9b7002ea.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/6e7aad126c429cc03a76438096c9e4ada409d88b.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/56e3ce67ea6700cc4fac4af9d92026d0afa4a24c.png@518w.png",
    "https://i0.hdslb.com/bfs/album/21f6a18b46101d4d9ee335ee0ecbe1cecd663243.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/835a03d2a2c73b3ea44e961f08a4a37edd6efdad.gif",
    "https://i0.hdslb.com/bfs/album/8bea8c9b6b6727eda15887002c78151237fb9f2f.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/1aea38df80496a078a66160d81329c8f12b93303.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/aec2e6ef46e8fb7922af5b66aa710127281e8cee.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/ba0bca7090fa4f09c623f113fa958f4bc03f85a9.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/7af615d85e5cb5e7c80724990ce9c570d62085ee.png@518w.png",
    "https://i0.hdslb.com/bfs/album/44e90c4609785ad3ff9c6cef7c9350a4f2795d80.png@518w.png",
    "https://i0.hdslb.com/bfs/album/0ab28fa406447e8c32077c4db74b64a9d0b3e98b.png@518w.png",
    "https://i0.hdslb.com/bfs/album/f6f577d65b49fa8c25133e2ab1a34b6140c02405.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/88d4744d19b7e36039a65fa36f58d2bf6a26dda0.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/a663b7d7620aafab4469ff63d8a72969f6267871.png@518w.png",
    "https://i0.hdslb.com/bfs/album/1b4e71f6918e0f1924fbaec5c625a3a58ffc5251.png",
    "https://i0.hdslb.com/bfs/album/1a27531d093eadb6061d484f1f1b10e55802ac28.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/1d5e55fde15eb6f087a248fd40d567418a775aae.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/a4b94ab0abf2848ceb34d5d4eceaf3642e0e2e2a.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/3e911243d4c6d3e090f77f84fd826f0c6ac00129.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/01b2d849fbcdfd044c278e124cb8b1f7103a89ef.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/1c716591d93db8a945150e1b67962fdb1a0bd453.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/6d3fb86d85e3954b5b5097660c006cc585e1ffe9.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/7f7086e0f670584fdd3eef73a0419faade20879b.jpg@518w.jpg",
    "https://i0.hdslb.com/bfs/album/24d6d9d9d5189934eeaaf743fe5010b60ae28cf1.png@518w.png"
]

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
    // doms.forEach(dom => {
    //     flip_front(dom);
    // });
    return new Promise((resolve, reject) => {
        doms.forEach(dom => {
            flip_front(dom);
        });
        setTimeout(() => {
            resolve();
        }, 3500);
    });
}

function all_flip_back() {
    return new Promise((resolve, reject) => {
        doms.forEach(dom => {
            flip_back(dom);
        });
        setTimeout(() => {
            resolve();
        }, 3500);
    });
}

function background_begin(){
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
        console.log(loaded_count, doms.length);
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

background_begin();

function fans_number_begin() {
    var num = -1;
    var numbers = null;
    ipcRenderer.on('fans-num', (e, new_fans_num) => {
        // console.log(new_fans_num);
        // add = Math.round(Math.random() * 100);
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
                    if(i == 5) {
                        numbers.resetData(final);
                        num = final;
                    } else {
                        numbers.resetData(num + step * i);
                    }
                }, i * 11700);
            }
        }
    })
    ipcRenderer.send('fans-num');
    setInterval(function () {
        ipcRenderer.send('fans-num');
    }, 60000);
}

fans_number_begin();

// console.log($('.my-grid'))
// console.log(waterfall)


// $(function () {
//     //初始化
//     var numRun1 = $(".numberRun1").numberAnimate({
//       num: 15342.10,
//       dot: 2,
//       speed: 2000,
//       symbol: ","
//     });
//     var numRun2 = $(".numberRun2").numberAnimate({
//       num: '52353434',
//       speed: 2000,
//       symbol: ","
//     });
//     var numRun3 = $(".numberRun3").numberAnimate({
//       num: '523534.343',
//       dot: 3,
//       speed: 2000
//     });
//     var numRun4 = $(".numberRun4").numberAnimate({
//       num: '1553434',
//       speed: 2000
//     });
//     var numRun5 = $(".numberRun5").numberAnimate({
//       num: '42.21',
//       pst: "%",
//       dot: 2,
//       speed: 2000,
//       symbol: ","
//     });
//     var numRun6 = $(".numberRun6").numberAnimate({
//       num: 1,
//       dot: 2,
//       speed: 500
//     });

//     var nums1 = 15342.10;
//     setInterval(function () {
//       nums1 += 21.31;
//       numRun1.resetData(nums1);
//     }, 3000);
//     var nums2 = 52353434;
//     setInterval(function () {
//       nums2 += 3434;
//       numRun2.resetData(nums2);
//     }, 3800);

//     var nums3 = 523534.343;
//     setInterval(function () {
//       nums3 += 7454.521;
//       numRun3.resetData(nums3);
//     }, 4000);

//     var nums4 = 1553434;
//     setInterval(function () {
//       nums4 += 1254;
//       numRun4.resetData(nums4);
//     }, 3500);

//     var nums5 = 42.21;
//     setInterval(function () {
//       nums5 += 2.55;
//       console.log(nums5)
//       console.log(numRun5)
//       numRun5.resetData(nums5);
//     }, 2500);


//     var nums6 = 1;
//     setInterval(function () {
//       nums6 += 1;
//       // console.log(nums6)
//       // console.log(numRun6)
//       numRun6.resetData(nums6);
//     }, 1000);

// })