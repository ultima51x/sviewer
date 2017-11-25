const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')
const { filter, selectAlbum, refresh } = require('./electron/store')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600 })

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'webpack.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const { ipcMain } = require('electron')

const SPOTIFY_CLIENT_ID='c6f89945d1c34d0f97a1e70f4d9b4b68'
let accessToken = null
let expiry = null

function createLoginWindow(evt) {
  // Create the browser window.
  let loginWindow = new BrowserWindow({ width: 300, height: 500 })
  let redirectBase = 'localhost:8765'
  let redirectUri = `http://${redirectBase}/callback`

  // and load the index.html of the app.
  const loginUrl = url.format({
    host: 'accounts.spotify.com',
    protocol: 'https',
    pathname: 'authorize',
    query: {
      client_id: SPOTIFY_CLIENT_ID,
      response_type: 'token',
      redirect_uri: redirectUri, 
      scope: 'user-library-read user-library-modify',
    }
  })

  loginWindow.loadURL(loginUrl)
  // Emitted when the window is closed.
  loginWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    loginWindow = null
  })
  loginWindow.webContents.on('did-fail-load', (_evt, _err, _errorDesc, newUrl) => {
    const lagInSeconds = 10
    if(new RegExp(redirectBase).test(newUrl)) {
      const urlObj = new url.URL(newUrl)
      const queryParams = new url.URLSearchParams(urlObj.hash.substr(1))
      accessToken = queryParams.get('access_token')
      expiry = Date.now() - lagInSeconds + Number.parseInt(queryParams.get('expires_in'))
      refresh(accessToken).then(() => {
        evt.sender.send('event:refresh:end')
      })
      loginWindow.close()
    }
  })
}

ipcMain.on('event:refresh:start', (evt, _arg) => {
  if (accessToken && expiry && Date.now() <= expiry) {
    refresh(accessToken).then(() => {
      evt.sender.send('event:refresh:end')
    })
  } else {
    createLoginWindow(evt)
  }
})  

ipcMain.on('event:filter:start', (event, criteria) => {
  const data = filter(criteria)
  event.sender.send('event:filter:end', data)
})

ipcMain.on('event:select:start', (event, albumId) => {
  const data = selectAlbum(albumId)
  event.sender.send('event:select:end', data)
})