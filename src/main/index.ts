import electron from "electron";
import { setupEvents } from "./events";
import url from "url";
import path from "path";

const app = electron.app;

// Adds debug features like hotkeys for triggering dev tools and reload

// Prevent window being garbage collected
let mainWindow: electron.BrowserWindow | null;

function onClosed() {
  // Dereference the window
  // For multiple windows store them in an array
  mainWindow = null;
}

function createMainWindow() {
  const win = new electron.BrowserWindow({
    width: 800,
    height: 600
    // frame: false,
    // titleBarStyle: "hiddenInset"
  });
  win.setMenu(null);
  win.setTitle("Sekiro Savegame Manager");
  win.on("page-title-updated", ev => ev.preventDefault());

  if (process.env.NODE_ENV === "development") {
    win.loadURL(`http://localhost:4723`);
    require("electron-debug")();
  } else {
    win.loadURL(`file://${path.join(__dirname, "index.html")}`);
  }

  win.on("closed", onClosed);

  return win;
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (!mainWindow) {
    mainWindow = createMainWindow();
  }
});

app.on("ready", () => {
  mainWindow = createMainWindow();
});

setupEvents();
