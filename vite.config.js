import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [
		react({
			fastRefresh: true,
		}),
	],
	server: {
		port: 3000,
		open: true,
		hmr: {
			port: 3000,
		},
		watch: {
			usePolling: true,
		},
	},
	define: {
		__DEV__: true,
	},
});
