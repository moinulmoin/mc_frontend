import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
import { splitVendorChunkPlugin } from 'vite';
export default defineConfig({
	plugins: [react(), splitVendorChunkPlugin()],
});
