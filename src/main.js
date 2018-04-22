const electron = require('electron'),
	  app = electron.app,
      minu = require('minu.js'),
      path = require('path'),
      url = require('url'),
	  shortcut = electron.globalShortcut;

let wino;
function create()
{
	if (process.platform === 'darwin')
	{
		wino = new electron.BrowserWindow(
	    {
	        width: 500,
	        minWidth: 400,
	        height: 500,
	        minHeight: 400,
	        icon: path.join(__dirname, 'img/icon.png'),
	        frame: false,
			acceptFirstMouse: true,
	        titleBarStyle: 'hidden',
	        webPreferences: {
	            experimentalFeatures: true
	        }
	    });
	}

	if (process.platform === 'win32')
	{
		wino = new electron.BrowserWindow(
	    {
	        width: 500,
	        minWidth: 400,
	        height: 500,
	        minHeight: 400,
	        icon: path.join(__dirname, 'img/icon.png'),
	        frame: true,
			acceptFirstMouse: true,
			autoHideMenuBar: true,
	        webPreferences: {
	            experimentalFeatures: true
	        }
	    });
	}

    wino.loadURL(url.format(
    {
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    wino.on('closed', function()
    { wino = null });

	minu.main();
}

// startup the main window when application has started
app.on('ready', create);

// clear all global shortcuts on exit
app.on('will-quit', function()
{ shortcut.unregisterAll(); });

// exit application when all windows are closed
app.on('window-all-closed', function()
{
    // on mac leave icon in the tray until explicitly closed
    if (process.platform !== 'darwin')
    { app.quit(); }
});

app.on('activate', function()
{
    // on mac if no windows are up then start the main window again
    if (wino === null)
    { create(); }
});