const NodeCatch = require('node-cache')

const config = {
    stdTTL: 60 * 60 * 6
}

const cache = new NodeCatch(config)

module.exports = cache
