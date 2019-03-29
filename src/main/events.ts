import { ipcMain } from "electron";

const setWorkDirectory = {
  action: "setWorkDirectory",
  success: "setWorkDirectorySuccess",
  error: "setWorkDirectoryError"
};

const setSaveGameDirectory = {
  action: "setSaveGameDirectory",
  success: "setSaveGameDirectorySuccess",
  error: "setSaveGameDirectoryError"
};

export const actions = {
  setWorkDirectory,
  setSaveGameDirectory
};

export function setupEvents() {
  ipcMain.on(setWorkDirectory.action, (event: any, workdirPath: string) => {
    event.sender.send(setWorkDirectory.success);
  });

  ipcMain.on(
    setSaveGameDirectory.action,
    (event: any, savegameDirPath: string) => {
      event.sender.send(setSaveGameDirectory.success);
    }
  );
}
