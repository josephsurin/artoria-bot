const Discord = require('discord.js')
const client = new Discord.Client()
const path = require('path')

require('dotenv').config()

const cmdPrefix = /^a\//
const commands = require(path.join(__dirname, '/src/commands.js'))
const commandsList = Object.keys(commands)

client.on('ready', () => {
	console.log('準備OK!')
	client.user.setPresence({
		game: {
			type: 'WATCHING',
			name: 'anime'
		}
	})
})

client.on('message', msg => {
	if(cmdPrefix.test(msg.content)) {
		var command = msg.content.split('/')[1].split(' ')[0]
		var args = msg.content.split(' ').slice(1)
		if(commandsList.includes(command)) {
			commands[command](msg, args)
		}
	}
})

client.login(process.env.TOKEN)