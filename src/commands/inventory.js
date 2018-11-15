const { servants } = require('../data/loadedData')
const { rarityToStars } = require('../util/util')


module.exports = function inventory(msg, args, db) {
	if(args.length == 0) {
		msg.channel.send('correct usage: `a/inventory type` where `type` is one of `waifu` or `gacha`')
		return false
	}

	if(args[0] == 'waifu') {
		const waifuCollection = db.collection('fgoWaifu')

		waifuCollection.find({ uid: msg.author.id }).toArray((err, results) => {
			if(results.length == 0) {
				msg.channel.send(`${msg.author.username} doesn't have any waifus! Use \`a/fgoWaifu\` to get some.`)
			} else {
				var { waifus } = results[0]
				var inventoryString = `${msg.author.username}'s waifus: \n`
				waifus.forEach(el => {
					var servant = servants.find(el1 => el1.id == el.id)
					inventoryString += `${el.id} | ${servant.name} (${rarityToStars(servant.stars)}): ${el.qty}\n`
				})
				msg.channel.send(inventoryString)
			}
		})

		return true
	}

	if(args[0] == 'gacha') {
		msg.channel.send('`a/inventory gacha` not yet implemented')
		return true
	}
}