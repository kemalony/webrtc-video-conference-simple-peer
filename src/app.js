const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
const httpolyglot = require('httpolyglot')
const https = require('https')

//////// CONFIGURATION ///////////

// insert your own ssl certificate and keys
const options = {
    key: fs.readFileSync('./src/sslforfree2/private.key'),
    cert: fs.readFileSync('./src/sslforfree2/certificate.crt'),
    ca: fs.readFileSync('./src/sslforfree2/ca_bundle.crt'),
}

const port = process.env.PORT || 3012

////////////////////////////

require('./routes')(app)

const httpsServer = httpolyglot.createServer(options, app)

const io = require('socket.io')(httpsServer)
           require('./socketController')(io)


httpsServer.listen(port, () => {
    console.log(`listening on port ${port}`)
})





