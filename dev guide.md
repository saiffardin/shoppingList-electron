1. To create a window we need a object of `BrowserWindow` class. We can set various properties of our window by passing params to this `BrowserWindow` class.

2. We write html code, the object of `BrowserWindow` class *loads* our html

---

3. To change the **menubar** of our window, we have to use `buildFromTemplate` method of `Menu` class. And pass our *custom-menubar* template

    ```js
    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    // insert menu
    Menu.setApplicationMenu(mainMenu)
    ```

4. *custom-menubar* template is an **array of objects**. A custom menu template is given below:
    ```js
    // Create menu template
    const mainMenuTemplate = [
        {
            label: 'File',
            submenu: [
                // submenu 1 - Add Item
                {
                    label: 'Add Item',
                    click() {
                        // code
                    }
                },

                // submenu 2 - Clear Items
                {
                    label: 'Clear Items'
                },

                // submenu 3 - Quit
                {
                    label: 'Quit',
                    accelerator: 'keyboard shortcut',
                }
            ]
        }
    ];
    ```
---

5. Things we have use to send and receive data between the files are:
    - `ipcRenderer.send()` : we've used this to **send** data from *html* to *js*
    - `ipcMain.on()` : we've used this to **catch** data, which is coming from *html* to *js*
    - `webContents.send()` : we've used this to **send** data from *js* to *html*
    - `ipcRenderer.on()` : we've used this to **catch** data, which is from *js* to *html*

    <br>
6. HTML files are using `ipcRenderer` 
7. JS files are using `ipcMain` and `webContents`

---