const path = require('path')

function getImgUrl(servantID) {
	return path.join(__dirname, `/assets/servant-images/${servantID.replace('/', '')}.png`)
}

function randElement(arr) {
	return arr[Math.floor(Math.random() * arr.length)]
}

function rarityToStars(rarity) {
	return ''.padStart(rarity, '★')
}

module.exports = {
	getImgUrl,
	randElement,
	rarityToStars
}