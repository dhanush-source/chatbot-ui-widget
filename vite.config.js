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
        compact: true,
        // Bundle all dependencies (widget should work standalone)
        inlineDynamicImports: true
      },
      // Externalize nothing - bundle everything for standalone use
      external: []
    },
    cssCodeSplit: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // Keep console.logs for debugging
        drop_debugger: true,
        pure_funcs: []
      },
      format: {
        comments: false
      }
    },
    sourcemap: false,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000
  }
})
