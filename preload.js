const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  openSite: (url) => ipcRenderer.send('open-site', url),
  openPDF: (fileName) => ipcRenderer.send('open-pdf', fileName),
  exitApp: () => ipcRenderer.send('exit-app'),
  onPDFList: (callback) => ipcRenderer.on('pdf-list', (event, list) => callback(list))
});
