const { Schema, model } = require('mongoose')

const schema = new Schema({
	userId: { type: Number, require: true },
	username: { type: String, require: true },
	winsCount: { type: Number, require: true }
})

module.exports = model('Stats', schema)