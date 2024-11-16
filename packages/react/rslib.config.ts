import { defineConfig } from '@rslib/core';
import { pluginReact } from '@rsbuild/plugin-react';
// import { pluginDts } from "rsbuild-plugin-dts"

export default defineConfig({
  lib: [
    {     
        format: 'esm',
        dts: true 
    },
    {        
        format: 'cjs',
        dts: true
    }
  ],
  output: {
    target: 'web', 
    minify: true,
  },
  plugins: [
    pluginReact(/** options here */),
    // pluginDts({}),
  ],
});