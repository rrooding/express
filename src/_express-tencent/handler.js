const fs = require('fs')
const { createServer, proxy } = require('tencent-serverless-http')

exports.handler = async (event, context) => {
  // NOTICE: require() is relative to this file, while existsSync() is relative to the cwd, which is the root of lambda
  let app
  if (fs.existsSync('./app.js')) {
    // load the user provided app
    app = require('../app.js')
  } else {
    // load the built-in default app
    app = require('../_src/app.js')
  }

  const server = createServer(app)
  return proxy(server, event, context, 'PROMISE').promise
}
