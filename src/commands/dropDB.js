module.exports = function dropDB(msg, args, db) {
	if(msg.author.id != '111028987836313600') {
		msg.channel.send('no!! you do not have the authority to do that')
		return false
	}
	if(args.length == 0) {
		msg.channel.send('invalid collection')
		return false
	}
	db.collection(args[0]).drop(err => {
		if(err) {
			msg.channel.send('invalid collection')
		} else {
			msg.channel.send(args[0] + ' collection deleted')
		}
	})
	
}