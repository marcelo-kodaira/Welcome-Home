import 'reflect-metadata'
import express from "express"
import "express-async-errors"
import handleErrorMiddleware from "./middlewares/handleError.middleware"
import userRoutes from "./routes/user.routes"
import loginRoutes from "./routes/login.routes"
import categoriesRoutes from './routes/categories.routes'
import propertiesRoutes from './routes/properties.routes'
import scheduleRouter from './routes/schedule.routes'

const app = express()
app.use(express.json())

app.use('/users',userRoutes)
app.use('/login',loginRoutes)
app.use('/categories',categoriesRoutes)
app.use('/properties',propertiesRoutes)
app.use('/schedules',scheduleRouter)
app.use(handleErrorMiddleware)

export default app