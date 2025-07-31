import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/trpc": {
        target: "http://localhost:4000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/trpc/, ""),
      },
    },
  },
});