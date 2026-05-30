import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        services: resolve(__dirname, 'services.html'),
        portfolio: resolve(__dirname, 'portfolio.html'),
        contact: resolve(__dirname, 'contact.html'),
        premiumCosmetics: resolve(__dirname, 'premium-cosmetics.html'),
        architectureDesign: resolve(__dirname, 'architecture-design.html'),
        addisGlobal: resolve(__dirname, 'addis-global.html'),
        tejTable: resolve(__dirname, 'tej-table.html'),
        ethioTech: resolve(__dirname, 'ethio-tech.html'),
      },
    },
  },
})
