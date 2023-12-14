const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const OpenApi = require('./WattWiseOpenApi.json');

const {
    getAllMember,
    signupPost,
    getMemberById,
    editMemberById,
    login,
    logout,
} = require('./dataHandler');

const routes = express.Router();

routes.use()
