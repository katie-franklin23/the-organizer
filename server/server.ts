import express from 'express'
import * as Path from 'node:path'
import 'dotenv/config'

// import fruitRoutes from './routes/fruits.ts'
import tasks from './routes/tasks.ts'
import steps from './routes/steps.ts'
import budget from './routes/budget.ts'

import weatherRoutes from './routes/weather'

import presents from './routes/presents.ts'

const server = express()

server.use(express.json())

// server.use('/api/v1/fruits', fruitRoutes)

server.use('/api/v1/todo', tasks)
server.use('/api/v1/steps', steps)
server.use('/api/v1/budgets', budget)

server.use('/api/v1/presents', presents)
server.use('/api/v1/weather/', weatherRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
