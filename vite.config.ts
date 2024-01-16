import { defineConfig } from 'vite'
import path from 'path';
import { fileURLToPath, URL } from "node:url";
// https://vitejs.dev/config/
export default defineConfig({
    build: {
        lib: {
            entry: {
                index: path.resolve(__dirname, 'src/index.ts'),
            },
            name: 'FieldsValidator',
            formats:['es']
        },
        rollupOptions: {
            external: [],
        },
    }
})
