import Store from "electron-store";
import { SavegameInfo } from "../common";

export type StoreContents = {
  gameDirectory: string | null;
  saveDirectory: string | null;
  savegames: SavegameInfo[];
};

export const store = new Store<StoreContents>({
  defaults: { gameDirectory: null, saveDirectory: null, savegames: [] }
});
