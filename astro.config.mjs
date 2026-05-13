import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'http://localhost:4321',
  markdown: {
    shikiConfig: {
      theme: 'github-dark-default',
      wrap: false,
    },
  },
  vite: {
    server: {
      watch: { usePolling: false },
    },
  },
});
