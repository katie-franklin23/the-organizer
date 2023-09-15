import express from 'express'
import * as db from '../db/to-do-functions'

const router = express.Router()

router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const list = await db.getAllTasks(id)
    res.json(list)
  } catch (error) {
    res.sendStatus(500)
  }
})

router.post('/', async (req, res) => {
  try {
    const newTask = req.body
    const added = await db.addTasks(newTask)

    res.json(added)
  } catch (error) {
    res.sendStatus(500)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    await db.deleteTask(id)

    res.sendStatus(200)
  } catch (err) {
    res.sendStatus(500)
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const taskid = Number(req.params.id)
    const update = req.body
    const editedTask = await db.editTask(taskid, update)

    res.json(editedTask)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

// router.patch('/:id', async (req, res) => {
//   try {
//     const id = Number(req.params.id)
//     const update = req.body

//     const updated = await db.updatePost(id, update)

//     res.json(updated)
//   } catch (err) {
//     res.sendStatus(500)
//   }
// })
export default router
