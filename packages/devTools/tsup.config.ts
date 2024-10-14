import { defineConfig } from 'tsup' 


export default defineConfig( [
    {
        entry: [
            'src/index.ts'
        ],
        format: ['esm','cjs'],
        dts: true,
        splitting: true,
        sourcemap: true,
        clean: true,
        treeshake:true,  
        minify: true 
    },
    {
        entry: [
            'src/cycleDetectExtend.ts'
        ],
        format: ['esm','cjs'],
        dts: true,
        splitting: true,
        sourcemap: true,
        clean: true,
        treeshake:true,  
        minify: true 
    }  
])
 