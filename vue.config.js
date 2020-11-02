const path = require("path")
const fs = require("fs")

// Sets up Webpack Dev Server to host on custom domain and SSL.
// Gets paths to SSL key and cert if serving this app
// over a custom domain and SSL.
// @see README.md for instructions on how to generate key and cert.

let dev_server = {}

// if (process.argv.includes("--https")) {
  const ssl_key = path.resolve(process.env.LOCAL_KEY)
  const ssl_cert = path.resolve(process.env.LOCAL_CERT)

  dev_server = {
    port: 443,
    host: "0.0.0.0",
    https: true,
    key: fs.readFileSync(ssl_key),
    cert: fs.readFileSync(ssl_cert),

    // This sets the public domain that webpack's dev server client
    // script uses to communicate with the dev server in Docker.
    // Without this it will try to communicate on 0.0.0.0 which will
    // prevent it from detecting updates.
    // @see https://webpack.js.org/configuration/dev-server/#devserverpublic

    public: process.env.LOCAL_URL,
  }
// }

module.exports = {
  
  // Dev Server

  devServer: dev_server,
}
