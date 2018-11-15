const path = require('path')
const fgoWaifu = require(path.join(__dirname, '/commands/fgoWaifu.js'))
const gacha = require(path.join(__dirname, '/commands/gacha.js'))
const dropDB = require(path.join(__dirname, '/commands/dropDB.js'))
const inventory = require(path.join(__dirname, '/commands/inventory.js'))

const commands = {
	fgoWaifu,
	gacha,
	dropDB,
	inventory
}

module.exports = commands