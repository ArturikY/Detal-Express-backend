import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export const register = async (req, res) => {
	try {
		const user = await prisma.user.create({
			data: {
				login: req.body.login,
				password: req.body.password,
				key: req.body.key,
				name: req.body.name,
				phone: req.body.phone,
				location: req.body.location,
			},
			include: {
				bids: true,
			},
		})

		const token = jwt.sign(
			{
				id: user.id,
			},
			'detal_secret_123',
			{
				expiresIn: '30d',
			}
		)

		res.json({ ...user, token })
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Failed registration',
		})
	}
}

export const login = async (req, res) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				login: req.body.login,
				password: req.body.password,
			},
			include: {
				bids: true,
			},
		})

		if (!user) {
			return res.status(404).json({
				message: 'User not found',
			})
		}

		const token = jwt.sign(
			{
				id: user.id,
			},
			'detal_secret_123',
			{
				expiresIn: '30d',
			}
		)

		res.json({ ...user, token })
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Failed authorization',
		})
	}
}

export const getMe = async (req, res) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: req.userId,
			},
			include: {
				bids: true,
			},
		})

		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}

		res.json({ ...user })
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'No access',
		})
	}
}

export const updateMe = async (req, res) => {
	try {
		const user = await prisma.user.update({
			where: {
				id: req.userId,
			},
			data: {
				login: req.body.login,
				password: req.body.password,
				key: req.body.key,
				name: req.body.name,
				phone: req.body.phone,
				location: req.body.location,
			},
			include: {
				bids: true,
			},
		})
		res.json({
			success: true,
			user: user,
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Failed to update a user',
		})
	}
}
