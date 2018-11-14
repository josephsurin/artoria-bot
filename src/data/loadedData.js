const fs = require('fs')
const path = require('path')

const servants = JSON.parse(fs.readFileSync(path.join(__dirname, './servants.json')))
const oneStarServants = servants.filter(el => el.stars == 1)
const twoStarServants = servants.filter(el => el.stars == 2)
const threeStarServants = servants.filter(el => el.stars == 3)
const fourStarServants = servants.filter(el => el.stars == 4)
const fiveStarServants = servants.filter(el => el.stars == 5)
const ce = JSON.parse(fs.readFileSync(path.join(__dirname, './ce.json')))
const threeStarCE = ce.filter(el => el.stars == 3)
const fourStarCE = ce.filter(el => el.stars == 4)
const fiveStarCE = ce.filter(el => el.stars == 5)
const probabilities = JSON.parse(fs.readFileSync(path.join(__dirname, './probabilities.json')))

module.exports = {
	servants,
	oneStarServants,
	twoStarServants,
	threeStarServants,
	fourStarServants,
	fiveStarServants,
	ce,
	threeStarCE,
	fourStarCE,
	fiveStarCE,
	probabilities
}