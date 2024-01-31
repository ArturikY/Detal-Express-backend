import cors from 'cors'
import express from 'express'

import { BidController, UserController } from './controllers/controllers.js'
import { checkAuth, handleValidationErrors } from './utils/utils.js'
import { BidValidations, UserValidations } from './validations/validations.js'
import { sendMessage } from './utils/sendMessage.js'

const app = express()

app.use(express.json())
app.use(cors())

app.post(
	'/api/auth/login',
	UserValidations.loginValid,
	handleValidationErrors,
	UserController.login
)
app.post(
	'/api/auth/register',
	UserValidations.registerValid,
	handleValidationErrors,
	UserController.register
)
app.get('/api/auth/me', checkAuth, UserController.getMe)
app.patch(
	'/api/auth/update',
	checkAuth,
	UserValidations.registerValid,
	handleValidationErrors,
	UserController.updateMe
)

app.post(
	'/api/bids',
	checkAuth,
	BidValidations.createValid,
	handleValidationErrors,
	BidController.create
)

app.post('/api/telegram', (req, res) => {
	const { info } = req.body
	sendMessage(info.user)
	sendMessage(info.car)
	res.json({
		success: true,
	})
})

app.listen(5000, err => {
	if (err) {
		return console.log(err)
	}

	console.log('Server Ok')
})
