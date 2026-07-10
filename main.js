const {
    app,
    BrowserWindow,
    Notification,
    Tray,
    Menu
} = require("electron");
const path = require("path");
const windowStateKeeper = require("electron-window-state");
const { autoUpdater } = require("electron-updater");
const log = require("electron-log");

log.transports.file.level = "info";

autoUpdater.logger = log;

autoUpdater.autoDownload = true;

let mainWindow;
let splash;
let tray;

function createWindows() {

    const mainWindowState = windowStateKeeper({

    defaultWidth: 1600,

    defaultHeight: 950

});

    // Splash Screen
    splash = new BrowserWindow({

        width: 600,
        height: 400,

        frame: false,

        transparent: false,

        alwaysOnTop: true,

        resizable: false,

        movable: false,

        center: true,

        autoHideMenuBar: true,

        icon: path.join(__dirname, "assets", "icon.ico")

    });

    splash.loadFile(path.join(__dirname, "splash.html"));

    // Main Window
    mainWindow = new BrowserWindow({

    x: mainWindowState.x,

    y: mainWindowState.y,

    width: mainWindowState.width,

    height: mainWindowState.height,

    minWidth: 1200,

    minHeight: 800,

        autoHideMenuBar: true,

        show: false,

        icon: path.join(__dirname, "assets", "icon.ico"),

        webPreferences: {

            contextIsolation: true

        }

    });

    mainWindow.loadFile(path.join(__dirname, "login.html"));

    mainWindowState.manage(mainWindow);

    mainWindow.on("close", (event) => {

    if (!app.isQuiting) {

        event.preventDefault();

        mainWindow.hide();

    }

});

    // After 2 seconds
    setTimeout(() => {

        splash.close();

        mainWindow.show();

    }, 2000);

}

app.whenReady().then(() => {

    createWindows();

    createTray();

    autoUpdater.checkForUpdatesAndNotify();

    setTimeout(() => {

        showNotification(

            "HD Business Suite",

            "Desktop notifications are working!"

        );

    },3000);

});

app.on("window-all-closed", () => {

    if (process.platform !== "darwin") {

        app.quit();

    }

});

function showNotification(title, body) {

    if (Notification.isSupported()) {

        new Notification({

            title,

            body,

            icon: path.join(__dirname, "assets", "icon.ico")

        }).show();

    }

}

function createTray() {

    tray = new Tray(
        path.join(__dirname, "assets", "icon.ico")
    );

    const contextMenu = Menu.buildFromTemplate([

        {
            label: "Open HD Business Suite",

            click: () => {

                mainWindow.show();

            }
        },

        {
            type: "separator"
        },

        {
            label: "Exit",

            click: () => {

                app.isQuiting = true;

                app.quit();

            }
        }

    ]);

    tray.setToolTip("HD Business Suite");

    tray.setContextMenu(contextMenu);

    tray.on("double-click", () => {

        mainWindow.show();

    });

}