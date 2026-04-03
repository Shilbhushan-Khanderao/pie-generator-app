import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Equivalent to CRA's "homepage": "./" — makes asset paths relative
  // so the build works when deployed to a sub-path (e.g. gh-pages).
  base: "./",
  server: {
    port: 4000,
  },
  optimizeDeps: {
    include: ["@react-pdf/renderer", "buffer"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate @react-pdf/renderer and dependencies into their own chunk
          "react-pdf": ["@react-pdf/renderer"],
          // Separate other large vendor libraries
          recharts: ["recharts"],
          "react-select": ["react-select", "react-select/creatable"],
        },
      },
    },
  },
  test: {
    // Vitest options — replaces react-scripts test (Jest)
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
  },
});
