// mock/api.mock.ts
import { defineMock } from "vite-plugin-mock-dev-server/helper";
var api_mock_default = defineMock([
  {
    url: "/api/hello",
    body: {
      message: "Hello World!"
    }
  },
  {
    url: "/api/upload",
    method: "POST",
    body(req) {
      const files = req.body.files;
      return {
        id: `${Math.random().toString(36).substring(2, 6)}`,
        size: files[0].size,
        url: `/public/uploads/${files[0].originalFilename}`,
        title: `\u6587\u4EF6${Math.random().toString(36).substring(2, 6)}`
      };
    }
  }
]);
export {
  api_mock_default as default
};
