const { app, Menu, BrowserWindow, screen, ipcMain } = require('electron')
const electronWallpaper = require('electron-wallpaper-napi')
const { setTimeout, console } = require('globalthis/implementation')
const axios = require('axios')

Menu.setApplicationMenu(null);

function get_bilibili_fans_data() {
  return axios.get('https://api.bilibili.com/x/relation/followers?vmid=1950658');
}

function get_fan_arts() {
  return axios.get('https://api.bilibili.com/x/relation/followers?vmid=1950658');
}

function createWindow () {
  win = new BrowserWindow({
    // width: screen.getPrimaryDisplay().workAreaSize.width,
    // height: screen.getPrimaryDisplay().workAreaSize.height,
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

  ipcMain.on('fans-num', (e) => {
    get_bilibili_fans_data().then(response => {
      win.webContents.send('fans-num', parseInt(response.data.data.total));
    }).catch(function (error) {
      // handle error
      win.webContents.send('fans-num', -1);
      console.log(error);
    })
  });

  win.loadFile('index.html')

  win.once('ready-to-show', () => {
    win.show();
    win.webContents.openDevTools();
    // electronWallpaper.attachWindow(win);
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

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// get_bilibili_fans_data().then((response) => {
//   console.log(response);
// }).catch(function (error) {
//   // handle error
//   console.log(error);
// })

// get_bilibili_fans_data().then(response => {
//   console.log(response.data.data.total);
// }).catch(function (error) {
//   // handle error
//   console.log(error);
// })