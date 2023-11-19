import 'dotenv/config';

import express from 'express';
import Hello from './hello.js';
import Lab5 from './lab5.js';
import CourseRoutes from './courses/routes.js';
import ModuleRoutes from './Modules/routes.js';
import AssignmentRoutes from './Assignments/routes.js';

import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
ModuleRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app);
Lab5(app);
Hello(app);

// app.listen(4000)
app.listen(process.env.PORT || 4000);
