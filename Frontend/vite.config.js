import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from 'url';

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './', // ✅ IMPORTANT: Electron ke liye relative paths
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Production mein size kam karne ke liye
    rollupOptions: {
      external: ['electron'], // Electron ko bundle mein include na karo
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    host: 'localhost'
  }
});

