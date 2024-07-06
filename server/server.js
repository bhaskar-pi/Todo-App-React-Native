const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const verifyDbConnection = require('./middlewares/db.middleware')
const userRouter = require('./routes/user.routes')
const taskRouter = require('./routes/tasks.routes')

dotenv.config()
const app = express()


app.use(cors())
app.use(express.json())
app.use(verifyDbConnection)
app.use('/user', userRouter)
app.use('/tasks', taskRouter)


app.listen(process.env.PORT, () => {
    console.log(`server is running at http://localhost:5000`)
})