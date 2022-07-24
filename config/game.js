const bot = require('./bot-import.js')

const SUCCESSFUL_STICKER_CONFIG = [
	'CAACAgEAAxkBAAICDWLdjooVBLRYZ4ARAAG6DJHuZ3KwNAACNgIAAlln0UfMZTS8WMY87SkE',
	'CAACAgIAAxkBAAICHmLdj8uByudLr1jsPFrMQuq1KLh6AAIQAgAC64eoIU1mv9vAOFA1KQQ',
	'CAACAgIAAxkBAAICH2Ldj-4knQGUB_SLFG7A7njijn23AALsHQACH-N4SjZAFyvi8aUkKQQ'
]
const BAD_STICKER_CONFIG = [
	'CAACAgIAAxkBAAICFWLdjt--BhN9f0pyu-c338l5xuJ3AAJ-EgACXKaRSJ_gLt-MXPjtKQQ',
	'CAACAgIAAxkBAAICIGLdkARSdbKG9og_YPiRxV94wTgRAAKUHQACijVxSmmSgVncOW6DKQQ',
	'CAACAgIAAxkBAAICIWLdkF1ql9b08MoXyoMaVjF1xkNKAAKCBQACbvNSLtraoDScTxJRKQQ',
	'CAACAgQAAxkBAAICImLdkJGlyLVtfdbqYgLlWlSlyAhwAAJoAQAC7fIqMOTvvFkVVrufKQQ',
]

const getRandomNumber = max => Math.floor(Math.random() * max)

const getRandomItemFromArray = arr => arr[getRandomNumber(arr.length)]

const checkBtns = (chatId, messageId) => {
	bot.on('callback_query', async msg => {
		const successfulRandomStickerId = getRandomItemFromArray(SUCCESSFUL_STICKER_CONFIG)
		const badRandomStickerId = getRandomItemFromArray(BAD_STICKER_CONFIG)

		const correctAnswer = getRandomNumber(3)
		if (correctAnswer == msg.data) {
			await bot.sendMessage(msg.message.chat.id, 'Ага, піймався, пацюче!🤩');
			bot.sendSticker(msg.message.chat.id, successfulRandomStickerId)
		} else {
			await bot.sendMessage(msg.message.chat.id, 'Йому вдалося вислизнути!😡');
			bot.sendSticker(msg.message.chat.id, badRandomStickerId)
		}
		bot.deleteMessage(chatId, messageId)
		bot.removeListener("callback_query")
	})
}

const startGame = async msg => {
	const gameOptions = {
		reply_markup: JSON.stringify({
			inline_keyboard: [
				[
					{ text: '✊', callback_data: 0 },
					{ text: '✊', callback_data: 1 },
					{ text: '✊', callback_data: 2 }
				]
			]
		}),
		parse_mode: 'Markdown'
	};

	await bot.sendMessage(msg.chat.id, `*${msg.from.first_name}*, відгадай, в якій руці щур!`, gameOptions)
		.then(async (m) => {
			await checkBtns(msg.chat.id, m.message_id)
		})
}

module.exports = {
	startGame
}