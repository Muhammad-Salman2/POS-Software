import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from 'url';

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false // Production mein issues avoid karne ke liye
    },
  });

  if (app.isPackaged) {
    // ✅ Production build ke liye - CORRECT PATH
    const indexPath = path.join(__dirname, "../dist/index.html");
    console.log("Loading production file:", indexPath);
    mainWindow.loadFile(indexPath);
  } else {
    // ✅ Development ke liye
    console.log("Loading dev server");
    mainWindow.loadURL("http://localhost:5173");
    mainWindow.webContents.openDevTools(); // Development mein devtools
  }

  // Window ready hone ka wait karo
  mainWindow.webContents.once('ready-to-show', () => {
    mainWindow.show();
    console.log("Window is ready and shown");
  });

  // Error handling
  mainWindow.webContents.on('did-fail-load', (error) => {
    console.error('Failed to load:', error);
  });
}

// App ready hone ka wait karo
app.whenReady().then(() => {
  createWindow();
  console.log("App is ready, window created");
});

// All windows closed
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// macOS re-activate
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
