const fs = require('fs')
const path = require('path')
const servants = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/servants.json')))
const oneStarServants = servants.filter(el => el.stars == 1)
const twoStarServants = servants.filter(el => el.stars == 2)
const threeStarServants = servants.filter(el => el.stars == 3)
const fourStarServants = servants.filter(el => el.stars == 4)
const fiveStarServants = servants.filter(el => el.stars == 5)
const probabilities = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/probabilities.json'))).fgoWaifu
const { randElement } = require('../util/util') 

module.exports = function fgoWaifu(msg, args) {
	var roll = Math.random()
	var rarity

	switch(true) {
	case(roll < probabilities['1']): //one star
		rarity = 1
		break
	case(roll< probabilities['1'] + probabilities['2']): //two star
		rarity = 2
		break
	case(roll < probabilities['1'] + probabilities['2'] + probabilities['3']): //three star
		rarity = 3
		break
	case(roll < probabilities['1'] + probabilities['2'] + probabilities['3'] + probabilities['4']): //four star
		rarity = 4
		break
	default: //roll >= probabilites['3'] + probabilities['4'] => five star
		rarity = 5
	}

	var waifu

	switch(rarity) {
	case 1: waifu = randElement(oneStarServants); break
	case 2: waifu = randElement(twoStarServants); break
	case 3: waifu = randElement(threeStarServants); break
	case 4: waifu = randElement(fourStarServants); break
	case 5: waifu = randElement(fiveStarServants); break
	default: console.log('something has gone wrong fgoWaifu.js'); break
	}

	var waifuEmbed = {
		title: 'Congratulations!',
		description: `${msg.author.username}'s fgo waifu is ${waifu.name}! They have a rarity of ${waifu.stars}.`,
		image: { url: waifu.image },
		color: 6815222
	}
	msg.channel.send({ embed: waifuEmbed })
}
