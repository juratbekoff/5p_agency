import express from "express";
import cors from 'cors'
import messageRoutes from "./routes/message.routes";


const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded( { extended: true }))

app.use('/message', messageRoutes)

const PORT = process.env.PORT || 8085

app.listen(PORT, () => {
    console.log('Server is running ...')
})
