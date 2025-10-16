import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/sdk.js',
      name: 'ChatbotWidget',
      fileName: (format) => `chatbot-widget.${format === 'umd' ? 'min.js' : 'es.min.js'}`,
      formats: ['umd', 'es']
    },
    rollupOptions: {
      output: {
        exports: 'named',
        compact: true
      }
    },
    cssCodeSplit: false,
    minify: 'terser',
    sourcemap: false,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000
  }
})
