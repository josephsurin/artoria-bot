const Discord = require('discord.js')
const client = new Discord.Client()
const path = require('path')
const MongoClient = require('mongodb').MongoClient

const url = 'mongodb://localhost:27017'

const dbName = 'artoriaDB'
var db = null

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

	MongoClient.connect(url, { useNewUrlParser: true }, (err, mongoclient) => {
		if(err) console.log(err)
		console.log('connected to database ', dbName)
	
		db = mongoclient.db(dbName)
	})
})

client.on('message', msg => {
	if(cmdPrefix.test(msg.content) && db) {
		var command = msg.content.split('/')[1].split(' ')[0]
		var args = msg.content.split(' ').slice(1)
		if(commandsList.includes(command)) {
			commands[command](msg, args, db)
		}
	}
})

client.login(process.env.TOKEN)