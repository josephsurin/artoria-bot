const { oneStarServants, twoStarServants, threeStarServants, fourStarServants, fiveStarServants, probabilities } = require('../data/loadedData')

const { randElement } = require('../util/util') 

module.exports = function fgoWaifu(msg, args, db) {
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

	//add to db
	const waifuCollection = db.collection('fgoWaifu')

	waifuCollection.find({ uid: msg.author.id }).toArray((err, results) => {
		if(results.length == 0) {
			var newRecord = { uid: msg.author.id, waifus: [ { id: waifu.id, qty: 1 } ] }
			waifuCollection.insertOne(newRecord, err => {
				if(err) throw err
				console.log('added new user ', msg.author.username, ' to waifu db')
			})
		} else {
			var currWaifus = results[0].waifus
			var waifuIndex = currWaifus.findIndex(el => el.id == waifu.id)
			if(waifuIndex == -1) {
				currWaifus.push({ id: waifu.id, qty: 1 })
			} else {
				currWaifus[waifuIndex].qty += 1
			}
			var updRecord = results[0]
			updRecord.waifus = currWaifus
			waifuCollection.updateOne({ uid: msg.author.id }, { $set: updRecord }, err => {
				if(err) throw err
			})
		}
	})
}
