const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const app = express();

const PORT = 8080 || process.env.PORT

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation for this project',
            version: '1.0.0',
            // description: 'API documentation for the application.',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
    },
    apis: ['./swagger.js'], // Path to the API endpoints file
};

const specs = swaggerJsdoc(options);
app.use('/', swaggerUi.serve, swaggerUi.setup(specs));

module.exports = app;


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - finished
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: name of the user
 *         email:
 *           type: string
 *           description: email of the user
 *         password:
 *           type: string
 *           description: password of the user
 *   securitySchemes:
 *       bearerAuth:
 *         type: apiKey
 *         scheme: bearer
 *         bearerFormat: JWT
 *         description: Enter your bearer token in the format Bearer {token}
 *         name: Authorization
 *         in: header
 */

/**
 * @swagger
 * 
 * /auth/signup:
 *   post:
 *     summary: For signup a user account
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name   
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user
 *               email:
 *                 type: string
 *                 description: The email of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *     responses:
 *       201:
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message indicating successful account creation
 *                 token:
 *                   type: string
 *                   description: Authentication token
 *       500:
 *         description: Internal server error
 * 
 * /auth/signin:
 *   post:
 *     summary: For signin a user account
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *     responses:
 *       200:
 *         description: Logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message indicating successful login
 *                 oldUser:
 *                   type: object
 *                   description: User details
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The unique identifier of the user
 *                     name:
 *                       type: string
 *                       description: The name of the user
 *                     email:
 *                       type: string
 *                       description: The email of the user
 *                     password:
 *                       type: string
 *                       description: The hashed password of the user
 *                     __v:
 *                       type: integer
 *                       description: Version number of the user object
 *                 token:
 *                   type: string
 *                   description: Authentication token
 *       500:
 *         description: Internal server error
 * 
 * /entries:
 *   get:
 *     summary: Secure API Endpoint for Authenticated Users Only. Retrieve entries from the API
 *     tags: [Entries]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter entries by category
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limit the number of entries
 *     security:
 *       - bearerAuth: [] 
 *     responses:
 *       200:
 *         description: Object which contain count and entries
 *       401:
 *         description: Unauthorized no token provided
 *       500:
 *         description: Internal server error
 */
