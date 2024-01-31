import { PrismaClient } from '@prisma/client'
import { sendMessage } from '../utils/sendMessage.js'

const prisma = new PrismaClient()

export const create = async (req, res) => {
	try {
		const bid = await prisma.bid.create({
			data: {
				vin: req.body.vin.toUpperCase(),
				key: req.body.key,
				text: req.body.text,
				author: { connect: { id: req.userId } },
			},
			include: {
				author: true,
			},
		})

		sendMessage(
			`Имя: ${bid.author.name} \nНомер телефона: ${bid.author.phone}\nМестоположение: ${bid.author.location}\nСписок запчастей: ${bid.text}\nVIN: ${bid.vin}\nKey: ${bid.key}
		`
		)
		res.json(bid)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Failed to create a bid',
		})
	}
}
