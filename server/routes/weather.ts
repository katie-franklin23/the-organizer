import express from 'express'
import { getWeather } from '../external-apis/weatherApi'

const router = express.Router()

router.get('/', async (req, res) => {
  console.log('hello')
  try {
    const response = await getWeather()
    res.json(response)
  } catch (err) {
    console.log(err)
    if (err instanceof Error) {
      res.status(500).send((err as Error).message)
    } else {
      res.status(500).send('Something went wrong')
    }
  }
})

export default router
