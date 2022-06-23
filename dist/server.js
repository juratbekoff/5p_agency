"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var message_routes_1 = __importDefault(require("./routes/message.routes"));
var publish_routes_1 = __importDefault(require("./routes/publish.routes"));
//Swagger
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
var swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API for 5P Marekting Agency',
        version: '1.0.0',
        description: 'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.',
        contact: {
            name: 'JSONPlaceholder',
            url: 'https://jsonplaceholder.typicode.com'
        }
    },
    servers: [
        {
            url: 'http://localhost:8085',
            description: 'Main Development Server!'
        },
    ]
};
var options = {
    swaggerDefinition: swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./routes/*.js']
};
var swaggerSpec = (0, swagger_jsdoc_1["default"])(options);
// server.js
// ...
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
// ...
var app = (0, express_1["default"])();
app.use('/docs', swagger_ui_express_1["default"].serve, swagger_ui_express_1["default"].setup(swaggerSpec));
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
*/
app.use((0, cors_1["default"])());
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
app.use('/message', message_routes_1["default"]);
app.use('/publish', publish_routes_1["default"]);
app.listen(process.env.PORT || 8085, function () {
    console.log('Server is running ...');
});
//# sourceMappingURL=server.js.map