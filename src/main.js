const { app, Menu, BrowserWindow, globalShortcut } = require('electron'),
	  minu = require('minu'),
	  trae = require('trae'),
      path = require('path'),
      url = require('url');

let wino;
function create()
{
	if (process.platform === 'darwin')
	{
		wino = new BrowserWindow(
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
		wino = new BrowserWindow(
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
    {
		trae.destroy();
		wino = null;
	});

	minu.main();
	trae.init(minu, wino);
}

// startup the main window when application has started
app.on('ready', create);

// clear all global shortcuts on exit
app.on('will-quit', function()
{ globalShortcut.unregisterAll(); });

// exit application when all windows are closed
app.on('window-all-closed', function()
{ app.quit(); });

app.on('activate', function()
{
    // on mac if no windows are up then start the main window again
    if (wino === null) create();
});