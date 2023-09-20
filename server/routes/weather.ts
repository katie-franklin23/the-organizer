import express from 'express'
import { getWeather } from '../external-apis/weatherApi'

const router = express.Router()

router.get('/:location', async (req, res) => {
  try {
    const location = req.params.location
    const response = await getWeather(location)

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
