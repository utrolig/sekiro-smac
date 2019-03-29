import electron from "electron";
import { setupEvents } from "./events";

const app = electron.app;

// Adds debug features like hotkeys for triggering dev tools and reload
require("electron-debug")();

// Prevent window being garbage collected
let mainWindow: electron.BrowserWindow | null;

function onClosed() {
  // Dereference the window
  // For multiple windows store them in an array
  mainWindow = null;
}

function createMainWindow() {
  const win = new electron.BrowserWindow({
    width: 600,
    height: 400
  });

  if (process.env.NODE_ENV === "development") {
    win.loadURL(`http://localhost:4723`);
    console.log("Is in dev mode.");
  } else {
    win.loadURL(`file://${process.cwd()}/public/index.html`);
  }

  win.maximize();
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
