const {app, BrowserWindow, Menu} = require('electron');
const url = require('url');
const path = require('path');

let mainWindow;
let addWindow;

// Listen for app to be ready
app.on('ready', () => {
    // Create new window
    mainWindow = new BrowserWindow({})

    // Load html into window
    // win.loadFile('index.html')
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file',
        slashes: true
    }));
    // mainWindow.loadURL("file://dirname/mainWindow.html")

    // -------------------------------- 
    /** Quit app when main window is closed */
    mainWindow.on('closed',()=>{
        app.quit();
    })

    // -------------------------------- 
    /** Changing Menu of our window */
    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    // insert menu
    Menu.setApplicationMenu(mainMenu)
})

// Handle create add window
function createAddWindow() {
    // Create new window
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add Shopping List Item'
    })

    // Load html into window
    // win.loadFile('index.html')
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html'),
        protocol: 'file',
        slashes: true
    }));

    // -------------------------------- 
    /** Garbage collection handler */
    addWindow.on('closed',()=>{
        addWindow = null;
    })
}

// Create menu template
const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Add Item',
                click() {
                    createAddWindow()
                }
            },
            {
                label: 'Clear Items'
            },
            {
                label: 'Quit',
                accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    }
];

// If mac, add empty object to menu
if (process.platform==='darwin') {
    mainMenuTemplate.unshift({})
}

// Add developer tools item is not in production
if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                label: 'Toggle Devtools',
                accelerator: process.platform === 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item,focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },

            {
                role: 'reload'
            }
        ]
    });
}