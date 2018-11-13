const fs = require('fs')
const path = require('path')
const servants = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/servants.json')))
const threeStarServants = servants.filter(el => el.stars == 3)
const fourStarServants = servants.filter(el => el.stars == 4)
const fiveStarServants = servants.filter(el => el.stars == 5)
const probabilities = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/probabilities.json'))).fgoWaifu
const { randElement } = require('../util/util') 

module.exports = function fgoWaifu(msg, args) {
	var roll = Math.random()
	var rarity

	switch(true) {
	case(roll < probabilities['3']): //three star
		rarity = 3
		break
	case(roll < probabilities['3'] + probabilities['4']): //four star
		rarity = 4
		break
	default: //roll >= probabilites['3'] + probabilities['4'] => five star
		rarity = 5
	}

	var waifu

	switch(rarity) {
	case 3: waifu = randElement(threeStarServants); break
	case 4: waifu = randElement(fourStarServants); break
	case 5: waifu = randElement(fiveStarServants); break
	default: console.log('something has gone wrong fgoWaifu.js'); break
	}

	var waifuEmbed = {
		title: 'Congratulations!',
		description: `Your fgo waifu is ${waifu.name}! They have a rarity of ${waifu.stars}.`,
		image: { url: waifu.image },
		color: 6815222
	}
	msg.channel.send({ embed: waifuEmbed })
}
