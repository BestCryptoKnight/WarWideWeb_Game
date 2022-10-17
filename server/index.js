require('dotenv').config() // Secures variables
const app = require('./utils/app') // Backend App (server)
const mongo = require('./utils/mongo') // MongoDB (database)
const {PORT} = require('./constants')
const authRoutes = require('./routes/auth')
const roomRoutes = require('./routes/room')
const imageRoutes = require('./routes/image')

async function bootstrap() {
  await mongo.connect()

  app.get('/', (req, res) => res.status(200).json({message: 'Hello World!'}))
  app.get('/healthz', (req, res) => res.status(200).send())
  app.use('/auth', authRoutes)
  app.use('/room', roomRoutes )
  app.use('/image', imageRoutes)
  
  app.listen(PORT, () => {
    console.log(`✅ Server is listening on port: ${PORT}`)
  })
}

bootstrap()
