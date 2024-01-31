import { body } from 'express-validator'

export const loginValid = [
	body('login', 'Invalid login format').isEmail(),
	body('password', 'Password must have 5 symbols').isLength({ min: 5 }),
]

export const registerValid = [
	body('login', 'Invalid login format').isEmail(),
	body('password', 'Password must have 5 symbols').isLength({ min: 5 }),
	body('name', 'Invalid name format').isString(),
	body('phone', 'Invalid phone format'),
	body('key', 'Invalid key format').isString().isLength({ min: 3, max: 3 }),
]
