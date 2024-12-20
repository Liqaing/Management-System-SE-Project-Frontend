import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
    return {
        plugins: [react()],
        server: {
            proxy: {
                "/api": {
                    target: `${
                        process.env.VITE_BASE_URL || "http://localhost:8000"
                    }/api/`,
                    changeOrigin: true,
                    secure: false,
                    ws: true,
                    rewrite: (path) => path.replace(/^\/api/, ""),
                },
            },
        },
    };
});
