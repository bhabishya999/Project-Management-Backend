const express = require('express');
const cors = require('cors');
const connectDB = require('./database/connection');
const app = express();
const {Router} = require("express");
const route = express.Router();
const { createProjectValidationFields,validateProject } = require('./validations/createProjectValidations');
const createProjectController = require('./controller/CreateProjectController');
const listProjectController = require('./controller/ListProjectDetailsController');

connectDB();

app.use(express.json());
app.use(cors());
app.use('/api',route);

route.post('/project', createProjectValidationFields, validateProject, createProjectController);
route.get('/project', validateProject, listProjectController);

app.listen(5000);
