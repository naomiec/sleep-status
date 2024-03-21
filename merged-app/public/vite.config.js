// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        app: resolve(__dirname, "app/index.html")
      }
    },
    outDir: "../public" // Build to the public directory
  },
  server: {
    proxy: {
      "/api": "http://localhost:3000"
    }
  }
});

