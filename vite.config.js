import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readFileSync } from 'fs';

// Read and parse sitemap data
const sitemapData = JSON.parse(
  readFileSync(resolve(__dirname, 'sitemap.json'), 'utf-8')
);

export default defineConfig({
  root: 'src',
  publicDir: '../assets',

  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },

  server: {
    port: 3000,
    open: true,
  },

  define: {
    __SITEMAP_DATA__: JSON.stringify(sitemapData),
  },

  css: {
    devSourcemap: true,
  },
});
