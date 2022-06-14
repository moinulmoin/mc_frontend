import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
export default defineConfig({
	plugins: [react(), chunkSplitPlugin()],
});
