import { body } from 'express-validator'

export const createValid = [
	body('vin', 'Invalid vin format').isString().isLength({ min: 17, max: 17 }),
	body('text', 'Invalid text format').isString(),
	body('key', 'Invalid key format').isString().isLength({ min: 5 }),
]
