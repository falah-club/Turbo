import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import {pluginSvgr} from "@rsbuild/plugin-svgr";

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginSvgr(),
    pluginModuleFederation({
      name: 'federation_provider',
      exposes: {
        './button': './src/App.tsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  server: {
    port: 213,
  },
});
