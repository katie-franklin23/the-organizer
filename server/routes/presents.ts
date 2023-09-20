import express from 'express'
import * as db from '../db/present-functions'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const presents = await db.getAllPresent()
    res.json(presents)
  } catch (error) {
    res.sendStatus(500)
  }
})

export default router
