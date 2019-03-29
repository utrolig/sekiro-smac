import { ipcMain } from "electron";
import { store } from "./store";

const getGameDirectory = {
  action: "getGameDirectory",
  success: "getGameDirectorySuccess",
  error: "getGameDirectoryError"
};

const getSaveDirectory = {
  action: "getSaveDirectory",
  success: "getSaveDirectorySuccess",
  error: "getSaveDirectoryError"
};

const setGameDirectory = {
  action: "setGameDirectory",
  success: "setGameDirectorySuccess",
  error: "setGameDirectoryError"
};

const setSaveDirectory = {
  action: "setSaveDirectory",
  success: "setSaveDirectorySuccess",
  error: "setSaveDirectoryError"
};

export const actions = {
  getGameDirectory,
  getSaveDirectory,
  setGameDirectory,
  setSaveDirectory
};

export function setupEvents() {
  ipcMain.on(setGameDirectory.action, (event: any, gameDirPath: string) => {
    try {
      store.set("gameDirectory", gameDirPath);
      event.sender.send(setGameDirectory.success, gameDirPath);
    } catch (err) {
      event.sender.send(setGameDirectory.error);
    }
  });

  ipcMain.on(setSaveDirectory.action, (event: any, saveDirPath: string) => {
    try {
      store.set("saveDirectory", saveDirPath);
      event.sender.send(setSaveDirectory.success, saveDirPath);
    } catch (err) {
      event.sender.send(setSaveDirectory.error);
    }
  });

  ipcMain.on(getGameDirectory.action, (event: any) => {
    try {
      const data = store.get("gameDirectory");
      event.sender.send(getGameDirectory.success, data);
    } catch (err) {
      event.sender.send(getGameDirectory.error);
    }
  });

  ipcMain.on(getSaveDirectory.action, (event: any) => {
    try {
      const data = store.get("saveDirectory");
      event.sender.send(getSaveDirectory.success, data);
    } catch (err) {
      event.sender.send(getSaveDirectory.error);
    }
  });
}
