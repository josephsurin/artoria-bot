const Jimp = require('jimp')
const path = require('path')

const { threeStarCE, fourStarCE, fiveStarCE, threeStarServants, fourStarServants, fiveStarServants, probabilities } = require('../data/loadedData')
const { randElement } = require('../util/util')

const numCards = 10

const cardWidth = 128
const cardHeight = 219

module.exports = function gacha(msg, args) {
	var results = []
	var resultsPortraits = []
	
	new Jimp(128*5, 219*2, (err, canv) => {
		for(var i = 0; i < numCards; i++) {
			var result = rollToRarityType(Math.random())
			var card
			if(result.type == 'ce') {
				switch(result.rarity) {
				case '3': card = randElement(threeStarCE); break
				case '4': card = randElement(fourStarCE); break
				case '5': card = randElement(fiveStarCE); break
				}
			} else { //servant
				switch(result.rarity) {
				case '3': card = randElement(threeStarServants); break
				case '4': card = randElement(fourStarServants); break
				case '5': card = randElement(fiveStarServants); break
				}
			}
			results.push(card)
			//draw the results
			const portrait = path.join(__dirname, `../assets/${result.type}-images-F/${card.id.replace('/', '')}.jpg`)
			resultsPortraits.push(Jimp.read(portrait))
		}
	
		Promise.all(resultsPortraits).then(portraits => {
			var drawing = canv
			for(var i = 0; i < numCards; i++) {
				drawing = drawing.composite(portraits[i], (i%5) * cardWidth, Math.floor(i/5) * cardHeight)
				if(i == numCards - 1) {
					drawing.getBuffer(Jimp.MIME_JPEG, (err, gachaBuffer) => {
						msg.channel.send(`${msg.author.username} rolled a gacha. Here are the results! \`\`\`${resultsToIDs(results)}\`\`\``, { files: [{ attachment: gachaBuffer, name: 'results.jpg' }] })
					})
				}
			}
		})
	})
	
	//returns servant/ce and rarity
	function rollToRarityType(roll) {
		var result
		var gachaProbs = probabilities.gacha
		var allCEProbs = gachaProbs.ce['3'] + gachaProbs.ce['4'] + gachaProbs.ce['5']
		switch(true) {
		case(roll < gachaProbs.ce['3']): result = { type: 'ce', rarity: '3' }; break
		case(roll < gachaProbs.ce['3'] + gachaProbs.ce['4']): result = { type: 'ce', rarity: '4' }; break
		case(roll < allCEProbs): result = { type: 'ce', rarity: '5' }; break
		case(roll < allCEProbs + gachaProbs.servants['3']): result = { type: 'servant', rarity: '3' }; break
		case(roll < allCEProbs + gachaProbs.servants['3'] + gachaProbs.servants['4']): result = { type: 'servant', rarity: '4' }; break
		case(roll <= 1): result = { type: 'servant', rarity: '5' }; break
		default: console.log('something has gone wrong gacha.js')
		}
		return result
	}

	function resultsToIDs(results) {
		var ids = ''
		results.forEach((el, i) => {
			if(i == 4) {
				ids += padID(el.id) + '\n'
			} else if(i == 9) {
				ids += padID(el.id)
			} else {
				ids += padID(el.id) + ' | '
			}
		})
		return ids
	}

	function padID(id) {
		var num = id.split('/')[1].padStart(3, '0')
		return (id.split('/')[0] + '/' + num).padEnd(6, ' ')
	}
}
