require('dotenv').config()
const mongoose = require('mongoose')
const userDB = process.env.MONGO_INITDB_ROOT_USERNAME
const passDB = process.env.MONGO_INITDB_ROOT_PASSWORD
const serviceDB = process.env.MONGO_SERVICE
const dbUrl = `mongodb+srv://${userDB}:${passDB}@${serviceDB}/?retryWrites=true&w=majority`

mongoose.Promise = global.Promise
const connectWithRetry = async () => {
	try {
		await mongoose.connect(dbUrl)
	} catch (e) {
		console.log(e);
	}
}

module.exports = {
  connectWithRetry
}