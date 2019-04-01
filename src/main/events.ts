import { ipcMain } from "electron";
import { store } from "./store";
import fs from "fs";
import path from "path";
import { ActiveSave, BackupActiveSavegameData, SavegameInfo } from "../common";

const sekiroSavegameName = "S0000.sl2";

const getActiveSavegameName = {
  action: "getActiveSavegameName",
  success: "getActiveSavegameNameSuccess",
  error: "getActiveSavegameNameError"
};

const restoreSavegame = {
  action: "restoreSavegame",
  success: "restoreSavegameSuccess",
  error: "restoreSavegameError"
};

const getSavegames = {
  action: "getSavegames",
  success: "getSavegamesSuccess",
  error: "getSavegamesError"
};

const backupActiveSavegame = {
  action: "backupActiveSavegame",
  success: "backupActiveSavegameSuccess",
  error: "backupActiveSavegameError"
};

const getActiveSavegame = {
  action: "getActiveSavegame",
  success: "getActiveSavegameSuccess",
  error: "getActiveSavegameError"
};

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
  backupActiveSavegame,
  getActiveSavegameName,
  getActiveSavegame,
  getGameDirectory,
  getSavegames,
  getSaveDirectory,
  setGameDirectory,
  setSaveDirectory,
  restoreSavegame
};

export function setupEvents() {
  ipcMain.on(getActiveSavegame.action, (event: any) => {
    try {
      const gameDirectory = store.get("gameDirectory");

      if (!gameDirectory) {
        throw new Error("No gamedirectory set.");
      }

      const [fileName] = fs.readdirSync(gameDirectory);
      const saveFilePath = path.resolve(gameDirectory, fileName);
      const saveFile = fs.statSync(saveFilePath);
      const dto: ActiveSave = {
        modifiedAt: saveFile.mtime,
        name: fileName
      };

      event.sender.send(getActiveSavegame.success, dto);
    } catch (err) {
      console.log(err);
      event.sender.send(getActiveSavegame.error, err);
    }
  });

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
      const files = fs.readdirSync(saveDirPath);
      const filePaths = files.map(file => path.resolve(saveDirPath, file));
      const fileStats = filePaths.map(fs.statSync);
      const savegames: SavegameInfo[] = fileStats.map((stat, idx) => ({
        name: files[idx],
        created: stat.mtime
      }));
      store.set("savegames", savegames);
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

  ipcMain.on(
    backupActiveSavegame.action,
    (event: any, data: BackupActiveSavegameData) => {
      try {
        const gameDirectory = store.get("gameDirectory");
        const saveDirectory = store.get("saveDirectory");

        if (!gameDirectory) {
          return event.sender.send(
            backupActiveSavegame.error,
            "Game directory not set."
          );
        }

        if (!saveDirectory) {
          return event.sender.send(
            backupActiveSavegame.error,
            "Save directory not set."
          );
        }

        const otherSaveGames = store.get("savegames");

        const [fileName] = fs.readdirSync(gameDirectory);
        const saveFilePath = path.resolve(gameDirectory, fileName);
        const newFilePath = path.resolve(saveDirectory, data.name);
        fs.copyFileSync(saveFilePath, newFilePath);
        const savegame: SavegameInfo = {
          created: new Date(),
          name: data.name
        };
        const savegames = [savegame, ...otherSaveGames];
        store.set("savegames", savegames);

        event.sender.send(backupActiveSavegame.success, savegames);
      } catch (err) {
        event.sender.send(backupActiveSavegame.error, err);
      }
    }
  );

  ipcMain.on(getSavegames.action, (event: any) => {
    try {
      const savegames = store.get("savegames");
      event.sender.send(getSavegames.success, savegames);
    } catch (err) {
      event.sender.send(getSavegames.error, err);
    }
  });

  ipcMain.on(restoreSavegame.action, (event: any, name: string) => {
    try {
      const gameDirectory = store.get("gameDirectory");
      const saveDirectory = store.get("saveDirectory");

      if (!saveDirectory) {
        throw new Error("No save directory set.");
      }

      if (!gameDirectory) {
        throw new Error("No game directory set.");
      }

      const pathToRestoreFile = path.resolve(saveDirectory, name);
      const restorePath = path.resolve(gameDirectory, sekiroSavegameName);
      fs.copyFileSync(pathToRestoreFile, restorePath);
      event.sender.send(restoreSavegame.success);
    } catch (err) {
      console.error(err);
      event.sender.send(restoreSavegame.error, err);
    }
  });

  ipcMain.on(getActiveSavegameName.action, (event: any) => {
    try {
      const gameDirectory = store.get("gameDirectory");
      const saveDirectory = store.get("saveDirectory");
      const savegames = store.get("savegames");

      if (!saveDirectory) {
        throw new Error("No save directory set.");
      }

      if (!gameDirectory) {
        throw new Error("No game directory set.");
      }

      const currentFilePath = path.resolve(gameDirectory, sekiroSavegameName);
      const currentFileStat = fs.statSync(currentFilePath);
      const otherFiles = savegames.map(savegame =>
        path.resolve(saveDirectory, savegame.name)
      );
      const otherFilesStat = otherFiles.map(fs.statSync);

      const findActive = otherFilesStat.findIndex(file => {
        if (
          file.size === currentFileStat.size &&
          file.mtime.toString() === currentFileStat.mtime.toString()
        ) {
          return true;
        }

        return false;
      });

      event.sender.send(
        getActiveSavegameName.success,
        findActive > -1 ? savegames[findActive].name : null
      );
    } catch (err) {
      console.error(err);
      event.sender.send(getActiveSavegameName.error, err);
    }
  });
}
