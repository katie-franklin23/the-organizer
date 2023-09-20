import express from 'express'
import * as db from '../db/budget-functions.ts'

const router = express.Router()

router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const list = await db.getBudget(id)
    res.json(list)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

router.post('/:id', async (req, res) => {
  try {
    const budget = req.body
    const added = await db.addBudget(budget)

    res.json(added)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const budgetId = Number(req.params.id)
    const update = req.body
    console.log(update)
    const editedBudget = await db.editedBudget(budgetId, update)

    res.json(editedBudget)
  } catch (error) {
    console.error(error)

    res.sendStatus(500)
  }
})

export default router
