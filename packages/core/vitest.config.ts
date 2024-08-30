import { defineConfig } from 'vitest/config'

// 因为测试过程中涉及到数据库操作，所以关闭所有并发测试

export default defineConfig({
    test: {
        sequence: {
            concurrent: false,
        },
        includeTaskLocation: true, 
    },
})
