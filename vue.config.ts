import { defineConfig } from '@vue/cli-service';

module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
      port: 3000, // change this to your desired port number
    },
  })