import { BrowserWindow, ipcMain } from "electron";
import path from "path";
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
// const assetsPath = process.env.NODE_ENV === "production" ? process.resourcesPath : app.getAppPath();
// let mainWindow: BrowserWindow | null;

export default class Main {
    static mainWindow: Electron.BrowserWindow | null;
    static application: Electron.App;
    static BrowserWindow: typeof BrowserWindow;
    static icpMainWindow: typeof ipcMain;
    private static onWindowAllClosed() {
        if (process.platform !== "darwin") {
            Main.application.quit();
        }
    }

    private static onClose() {
        // Dereference the window object.
        Main.mainWindow = null;
    }

    private static onActive() {
        if (BrowserWindow.getAllWindows().length === 0) {
            Main.onReady();
        }
    }

    static async registerListeners(listenFuncion: ListenFuncion) {
        /**
         * This comes from bridge integration, check bridge.ts
         */
        Main.application.on("ready", Main.onReady).whenReady().then(listenFuncion);
    }

    private static onReady() {
        Main.mainWindow = new Main.BrowserWindow({
            //         // icon: path.join(assetsPath, 'assets', 'icon.png'),
            width: 1100,
            height: 700,
            backgroundColor: "#191622",
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule: true,
                contextIsolation: true,
                preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
            },
        });
        Main.mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
        Main.mainWindow.on("closed", Main.onClose);
    }

    static main(app: Electron.App, browserWindow: typeof BrowserWindow, icpMainWindow: typeof ipcMain) {
        // we pass the Electron.App object and the
        // Electron.BrowserWindow into this function
        // so this class has no dependencies. This
        // makes the code easier to write tests for
        Main.BrowserWindow = browserWindow;
        Main.application = app;
        Main.icpMainWindow = icpMainWindow;
        Main.application.on("window-all-closed", Main.onWindowAllClosed);
        Main.application.on("ready", Main.onReady);
        Main.application.on("activate", Main.onActive);
    }
}
// function createWindow() {
//     mainWindow = new BrowserWindow({
//         // icon: path.join(assetsPath, 'assets', 'icon.png'),
//         width: 1100,
//         height: 700,
//         backgroundColor: "#191622",
//         webPreferences: {
//             nodeIntegration: true,
//             enableRemoteModule: true,
//             contextIsolation: true,
//             preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
//         },
//     });

//     mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

//     mainWindow.on("closed", () => {
//         mainWindow = null;
//     });
// }

// async function registerListeners() {
//     /**
//      * This comes from bridge integration, check bridge.ts
//      */
//     ipcMain.on("message", (_, message) => {
//         console.log(message);
//     });
// }

// app.on("ready", createWindow)
//     .whenReady()
//     .then(registerListeners)
//     .catch((e) => console.error(e));

// app.on("window-all-closed", () => {
//     if (process.platform !== "darwin") {
//         app.quit();
//     }
// });

// app.on("activate", () => {
//
// });
