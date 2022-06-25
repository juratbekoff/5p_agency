import express from "express";
import cors from 'cors'
import messageRoutes from "./routes/message.routes";
import publishRoutes from "./routes/publish.routes"
import caruselRoutes from "./routes/carusel.routes"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded( { extended: true }))

app.use('/message', messageRoutes)
app.use('/news', publishRoutes)
app.use('/carusel', caruselRoutes )

app.listen(process.env.PORT || 8085, () => {
    console.log('Server is running ...')
})
