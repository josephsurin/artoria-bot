const path = require('path')
const fgoWaifu = require(path.join(__dirname, '/commands/fgoWaifu.js'))
const gacha = require(path.join(__dirname, '/commands/gacha.js'))

const commands = {
	fgoWaifu,
	gacha
}

module.exports = commands