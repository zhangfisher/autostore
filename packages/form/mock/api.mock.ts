import { defineMock } from 'vite-plugin-mock-dev-server'

export default defineMock([
    {
        url: '/api/hello',
        body: {
            message: 'Hello World!'
        }
    }, {
        url: '/api/upload',
        method: 'POST',
        body(req) {
            const files = req.body.files
            //throw new Error('upload error')
            return `/uploads/${files[0].originalFilename}`
            // return {
            //     size: files[0].size,
            //     url: `/uploads/${files[0].originalFilename}`,
            // }
        },
    }])