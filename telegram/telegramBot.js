import TelegramBot from 'node-telegram-bot-api'

const token = '6706275508:AAFYleC4o4_gF-jgCuQ91ChGfUyp6dMNrUE'

export const telegramBot = new TelegramBot(token, { polling: true })
