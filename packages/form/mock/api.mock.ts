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
            const body = req.body
            // console.log("upload:", body.file)
            // throw new Error('upload error')
            return {
                name: body.name,
                url: `/uploads/${body.file.originalFilename}`,
            }
        },
    }])