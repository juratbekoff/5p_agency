import express from "express";
import cors from 'cors'
import messageRoutes from "./routes/message.routes";
import publishRoutes from "./routes/publish.routes"

//Swagger
import swaggerJSDoc from 'swagger-jsdoc'

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Express API for 5P Marekting Agency',
      version: '1.0.0',
      description:
        'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.',
      contact: {
        name: 'JSONPlaceholder',
        url: 'https://jsonplaceholder.typicode.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:8085',
        description: 'Main Development Server!',
      },
    ],
  };

const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

// server.js
// ...
import swaggerUi from 'swagger-ui-express'
// ...

const app = express()

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
*/


app.use(cors())
app.use(express.json())
app.use(express.urlencoded( { extended: true }))

app.use('/message', messageRoutes)
app.use('/publish', publishRoutes)

app.listen(process.env.PORT || 8085, () => {
    console.log('Server is running ...')
})
