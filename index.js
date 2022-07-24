require('dotenv').config()
const express = require('express')
const app = express()
const dbConfig = require('./config/dataBase.js')
const { startTelegramBot } = require('./config/bot.js')
const { store, update } = require('./controller/StatsCont')

dbConfig.connectWithRetry() // connect to mongodb

app.listen(process.env.APP_PORT, () => {
	console.log('SERVER HAS BEEN STARTED...');
	startTelegramBot();
})

// const testDB = async () => {
// 	const bodyInput = {
// 		userId: 1,
//     username: 'name',
//     winsCount: 1
//   }
//   await store(bodyInput)
// }