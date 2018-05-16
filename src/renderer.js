const $ = require('jquery.js'),
      compile = require('compile'),
      { remote, ipcRenderer } = require('electron'),
	  shortcut = remote.globalShortcut;

$(document).ready(function()
{
    const storage = require('storage'),
          cron = require('cron'),
          automate = require('automate'),
          view = $('view'),
          main = $('body');

    // render index by default
    render('index');

    // handle anchor linking within the application
    main.on('click', 'menu [link]', function(event)
    {
        event.preventDefault();
        let view = $(this).attr('link');
        render(view);
        return false;
    });

    // handle shortcut behaviors
    let lastKey = null;
    main.on('keydown', function(event)
    {
        let key = event.which || event.keyCode,
            save = $('#save', view);

        if (save.length && (lastKey === 91 || lastKey === 17) && key === 83)
        { save.trigger('click'); }

        lastKey = key;
    });

    main.on('keyup', function(event)
    {
        let key = event.which || event.keyCode,
            back = $('#back', view);

        if (key === 27 && back.length)
        { back.trigger('click'); }
    });

    main.on('keyup', function(event)
    { lastKey = null; });

    // prevent unwanted/unaccounted for drag and drop behavior
    main.on('dragover drop', function(event)
    {
        event.stopPropagation();
        event.preventDefault();
    });

    function render(vi)
    {
        view.html(compile.view(vi)).attr('id', vi);
		view.addClass(process.platform);

        switch (vi)
        {
            case 'index':
                // handle paste text and write to draggable file functionality
                require('paste').init($('index'));

                // handle drag file and copy contents to clipboard functionality
                require('clip').init($('index'));
            break;

            case 'color':
                // handle color (hex/rgb/hsl) conversions, selection, etc
                require('color').init($('color'));
            break;

            case 'storage':
                // setup and attach add all event handling for clipboard history tab
                storage.init($('storage'));
            break;

            case 'cron':
                // setup and attach all event handling for the scheduled tasks
                cron.init($('cron'));
            break;

            case 'entities':
                // setup and attach all event handling for entities list
                require('entities').init($('entities'));
            break;

            case 'automate':
                // setup and attach all event handling for automate
                automate.init($('automate'));
            break;

            // todo: add hotkey mapping util
            // todo: add notes with options to check off the notes as done (doubles as task todos)
            // todo: add a keycode viewer
        }
    }

    // handle storing of the clipboard data for future use
    let storageInterval = setInterval(function()
    { storage.save($('storage')); }, 2000);

    // default to clipboad 1 when the application starts
    storage.switch(1);
    ipcRenderer.send('switch-clipboard-1');

    // handle clipboard switching
    shortcut.register('CommandOrControl+1', function()
    { storage.switch(1); ipcRenderer.send('switch-clipboard-1'); });

    ipcRenderer.on('switch-clipboard-1', function()
    { storage.switch(1); ipcRenderer.send('switch-clipboard-1'); });

    shortcut.register('CommandOrControl+2', function()
    { storage.switch(2); ipcRenderer.send('switch-clipboard-2'); });

    ipcRenderer.on('switch-clipboard-2', function()
    { storage.switch(2); ipcRenderer.send('switch-clipboard-2'); });

    // handle running of scheduled tasks
    let cronInterval = setInterval(function()
    { cron.run($('cron')); }, 10000);
});