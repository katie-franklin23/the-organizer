import express from 'express'
import * as db from '../db/steps-functions'

const router = express.Router()

router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const list = await db.getAllSteps(id)
    res.json(list)
  } catch (error) {
    res.sendStatus(500)
  }
})

router.post('/:id', async (req, res) => {
  try {
    const steps = req.body
    const added = await db.addSteps(steps)

    res.json(added)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

export default router
