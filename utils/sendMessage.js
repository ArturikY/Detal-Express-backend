import { telegramBot } from '../telegram/TelegramBot.js'

const chatId = '-4104691003'

export const sendMessage = message => {
	telegramBot.sendMessage(chatId, message)
}
