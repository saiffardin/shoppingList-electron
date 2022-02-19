const {app, BrowserWindow, Menu, ipcMain} = require('electron');
const url = require('url');
const path = require('path');

let mainWindow;
let addWindow;

const createNewWindow = (browserWindowObj, htmlFileName) => {

    // Load html into window
    browserWindowObj.loadURL(url.format({
        pathname: path.join(__dirname, htmlFileName),
        protocol: 'file',
        slashes: true
    }));
}

// Listen for app to be ready
app.on('ready', () => {
    // Create new window
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    createNewWindow(mainWindow, 'mainWindow.html');

    // -------------------------------- 
    /** Quit app when main window is closed */
    mainWindow.on('closed', () => {
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
        title: 'Add Shopping List Item',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    createNewWindow(addWindow, 'addWindow.html');

    // -------------------------------- 
    /** Garbage collection handler */
    addWindow.on('closed', () => {
        addWindow = null;
    })
}

// -------------------------------- 
/** Catch item:add, this is coming from "addWindow.html"*/
ipcMain.on('item:add', (e, item) => {
    console.log(item);
    mainWindow.webContents.send('item:add', item);
    // this will send the item to 'mainWindow.html'


    // addWindow.close();
});


// Create menu template
const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            // submenu 1 - Add Item
            {
                label: 'Add Item',
                click() {
                    createAddWindow()
                }
            },

            // submenu 2 - Clear Items
            {
                label: 'Clear Items',
                click(){
                    mainWindow.webContents.send('item:clear');
                }
            },

            // submenu 3 - Quit
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
if (process.platform === 'darwin') {
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
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },

            {
                role: 'reload'
            }
        ]
    });
}