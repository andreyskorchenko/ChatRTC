import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'node:path';

export default defineConfig({
	plugins: [react()],
	server: {
		port: 8080
	},
	resolve: {
		alias: [{ find: '@', replacement: resolve(__dirname, './src') }]
	},
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler',
				additionalData: `
    				@use "${resolve(__dirname, './src/app/styles/mixins.scss')}" as *;
    				@use "${resolve(__dirname, './src/app/styles/variables.scss')}" as *;
				`
			}
		}
	}
});
