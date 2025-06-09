import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        content: 'src/content.ts',
        background: 'src/background.ts',
        popup: 'src/popup.ts'
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'content/[name].js'
      }
    },
    outDir: 'dist',
    emptyOutDir: true,
    cssCodeSplit: false
  }
})
