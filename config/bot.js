const TelegramApi = require('node-telegram-bot-api')

const token = process.env.BOT_TOKEN

const bot = new TelegramApi(token, {polling: true});

const startTelegramBot = () => {
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

	bot.setMyCommands([
		{command: '/game', description: 'Почати гру!'}
	])

	bot.onText(/\/game/, async msg => {
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

		await bot.sendMessage(msg.from.id, `*${msg.from.first_name}*, відгадай, в якій руці щур!`, gameOptions);
	});

	const getRandomNumber = max => Math.floor(Math.random() * max)

	bot.on('callback_query', async msg => {
		await bot.deleteMessage(msg.from.id, msg.message.message_id)

		const successfulRandomStickerId = SUCCESSFUL_STICKER_CONFIG[getRandomNumber(SUCCESSFUL_STICKER_CONFIG.length)]
		const badRandomStickerId = BAD_STICKER_CONFIG[getRandomNumber(BAD_STICKER_CONFIG.length)]

		const correctAnswer = getRandomNumber(3)
		if (correctAnswer == msg.data) {
			await bot.sendMessage(msg.from.id, 'Ага, піймався, пацюче!🤩');
			bot.sendSticker(msg.from.id, successfulRandomStickerId)
		} else {
			await bot.sendMessage(msg.from.id, 'Йому вдалося вислизнути!😡');
			bot.sendSticker(msg.from.id, badRandomStickerId)
		}
	})
}

module.exports = {
  startTelegramBot
}