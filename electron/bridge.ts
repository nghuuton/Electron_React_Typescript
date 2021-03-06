import { contextBridge, ipcRenderer } from "electron";

export const api = {
    /**
     * Here you can expose functions to the renderer process
     * so they can interact with the main (electron) side
     * without security problems.
     *
     * The function below can accessed using `window.Main.sayHello`
     */

    sendMessage: (message: string) => {
        ipcRenderer.send("message", message);
        // remote.dialog
        //     .showOpenDialog({
        //         title: "Open Dialogue",
        //         message: "First Dialog",
        //         //pass 'openDirectory' to strictly open directories
        //         properties: ["openFile"],
        //     })
        //     .then((result) => {
        //         shell.openPath(result.filePaths[0]);
        //         return result;
        //     });
    },

    /**
     * Provide an easier way to listen to events
     */
    on: (channel: string, callback: Function) => {
        ipcRenderer.on(channel, (_, data) => callback(data));
    },
};

contextBridge.exposeInMainWorld("Main", api);
