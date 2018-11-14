const { oneStarServants, twoStarServants, threeStarServants, fourStarServants, fiveStarServants, probabilities } = require('../data/loadedData')


const { randElement } = require('../util/util') 

module.exports = function fgoWaifu(msg, args) {
	var roll = Math.random()
	var rarity
	var waifuProbs = probabilities.fgoWaifu
	switch(true) {
	case(roll < waifuProbs['1']): //one star
		rarity = 1
		break
	case(roll< waifuProbs['1'] + waifuProbs['2']): //two star
		rarity = 2
		break
	case(roll < waifuProbs['1'] + waifuProbs['2'] + waifuProbs['3']): //three star
		rarity = 3
		break
	case(roll < waifuProbs['1'] + waifuProbs['2'] + waifuProbs['3'] + waifuProbs['4']): //four star
		rarity = 4
		break
	default: //roll >= waifuProbs['3'] + waifuProbs['4'] => five star
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
