const { app, Menu, BrowserWindow, screen, ipcMain, Tray } = require('electron')
const path = require('path');
const electronWallpaper = require('electron-wallpaper-napi')
const { setTimeout, console } = require('globalthis/implementation')
const axios = require('axios');

Menu.setApplicationMenu(null);

function get_bilibili_fans_data() {
  return axios.get('https://api.bilibili.com/x/relation/stat?vmid=1950658');
}

// fan_art_tags = [
//   {
//     id: "16520874",
//     name:"好叽绘"
//   },
//   {
//     id: "11218299",
//     name: "早稻叽FANART"
//   }
// ]

// function get_new_fan_arts_() {
//   return axios.get('https://api.vc.bilibili.com/topic_svr/v1/topic_svr/topic_new?topic_id=16520874')
// }

// function get_fan_arts() {
//   // return axios.get('https://api.bilibili.com/x/relation/followers?vmid=1950658');

// }

function createWindow () {
  win = new BrowserWindow({
    width: screen.getPrimaryDisplay().workAreaSize.width,
    height: screen.getPrimaryDisplay().workAreaSize.height + 200,
    fullscreen: true,
    webPreferences: {
      nodeIntegration: true
    },
    show: false
  })

  // ipcMain.on('exper-action', (e, arg) => {
  //   console.log(arg);
  //   win.webContents.send('get-data', 'msg from main');
  // });

  // let num = 298500;

  ipcMain.on('fans-num', (e) => {
    // num += Math.floor(Math.random() * 500);
    // win.webContents.send('fans-num', parseInt(num))
    get_bilibili_fans_data().then(response => {
      win.webContents.send('fans-num', parseInt(response.data.data.follower));
    }).catch(function (error) {
      // handle error
      win.webContents.send('fans-num', -1);
      console.log(error);
    })
  });

  win.loadFile('index.html')

  win.once('ready-to-show', () => {
    win.show();
    // win.webContents.openDevTools();
    electronWallpaper.attachWindow(win);
    // setTimeout(() => {
    //     // const currentWindow = require('electron').remote.getCurrentWindow();
    //     electronWallpaper.attachWindow(win);
    // }, 500);
  })
}

app.disableHardwareAcceleration()

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

let tray = null
app.on('ready', () => {
  tray = new Tray(path.join(__dirname, "./icon.ico"));
  const contextMenu = Menu.buildFromTemplate([
      {
          label: '退出',
          click: function(){
              app.quit();
          }
      }
  ]);
  tray.setToolTip('WaseTT Wallpaper');
  tray.setContextMenu(contextMenu);
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// get_bilibili_fans_data().then(response => {
//   console.log(response.data.data.total);
// }).catch(function (error) {
//   // handle error
//   console.log(error);
// })