import { app, BrowserWindow, ipcMain } from "electron";
import Main from "./Main";

Main.main(app, BrowserWindow, ipcMain);
Main.registerListeners(registerListeners);

async function registerListeners() {
    /**
     * This comes from bridge integration, check bridge.ts
     */
    Main.icpMainWindow.on("message", (_, message) => {
        // console.log(message);
        Main.mainWindow?.webContents.send("message", message);
    });
}
