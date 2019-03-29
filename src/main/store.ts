import Store from "electron-store";

export type StoreContents = {
  gameDirectory: string;
  saveDirectory: string;
};

export const store = new Store<StoreContents>();
