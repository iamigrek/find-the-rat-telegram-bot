const bot = require('./bot-import.js')
const { startGame } = require('./game.js')

const startTelegramBot = () => {
	bot.setMyCommands([
		{command: '/game', description: 'Почати гру!'}
	])

	bot.onText(/\/game/, msg => {
		startGame(msg)
	});
}

module.exports = {
  startTelegramBot
}