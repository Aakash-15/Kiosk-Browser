const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    fullscreen: true,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  });

  mainWindow.loadFile('index.html');

  // Send PDF list to renderer once loaded
  mainWindow.webContents.once('did-finish-load', () => {
    const pdfFolder = path.join(__dirname, 'pdfs');
    let pdfFiles = [];
    if (fs.existsSync(pdfFolder)) {
      pdfFiles = fs.readdirSync(pdfFolder)
        .filter(file => file.endsWith('.pdf'));
    }
    mainWindow.webContents.send('pdf-list', pdfFiles);
  });
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// Open website
ipcMain.on('open-site', (event, url) => {
  const siteWin = new BrowserWindow({
    fullscreen: true,
    frame: false,
    webPreferences: { contextIsolation: true }
  });
  siteWin.loadURL(url);

  // Small Back button
  siteWin.webContents.once('did-finish-load', () => {
    siteWin.webContents.executeJavaScript(`
      const btn = document.createElement('button');
      btn.innerText = 'Back';
      btn.style.position = 'fixed';
      btn.style.top = '10px';
      btn.style.left = '10px';
      btn.style.padding = '5px 10px';
      btn.style.fontSize = '12px';
      btn.style.background = '#ff4d6a';
      btn.style.color = 'white';
      btn.style.border = 'none';
      btn.style.borderRadius = '5px';
      btn.style.zIndex = '9999';
      btn.style.opacity = '0.7';
      btn.style.cursor = 'pointer';
      btn.onmouseover = () => btn.style.opacity = '1';
      btn.onmouseout = () => btn.style.opacity = '0.7';
      btn.onclick = () => window.close();
      document.body.appendChild(btn);
    `);
  });
});

// Open PDF in fullscreen with toolbar and page navigation
ipcMain.on('open-pdf', (event, fileName, page = 1) => {
  const pdfPath = path.join(__dirname, 'pdfs', fileName);
  const pdfWin = new BrowserWindow({
    fullscreen: true,
    frame: false,
    webPreferences: { contextIsolation: true }
  });

  // #toolbar=1 shows toolbar, #page=pageNumber opens specific page
  pdfWin.loadURL(`file://${pdfPath}#toolbar=1&page=${page}`);

  // Small Back button
  pdfWin.webContents.once('did-finish-load', () => {
    pdfWin.webContents.executeJavaScript(`
      const btn = document.createElement('button');
      btn.innerText = 'Back';
      btn.style.position = 'fixed';
      btn.style.top = '10px';
      btn.style.left = '10px';
      btn.style.padding = '5px 10px';
      btn.style.fontSize = '12px';
      btn.style.background = '#ff4d6a';
      btn.style.color = 'white';
      btn.style.border = 'none';
      btn.style.borderRadius = '5px';
      btn.style.zIndex = '9999';
      btn.style.opacity = '0.7';
      btn.style.cursor = 'pointer';
      btn.onmouseover = () => btn.style.opacity = '1';
      btn.onmouseout = () => btn.style.opacity = '0.7';
      btn.onclick = () => window.close();
      document.body.appendChild(btn);
    `);
  });
});

// Exit app
ipcMain.on('exit-app', () => app.quit());
