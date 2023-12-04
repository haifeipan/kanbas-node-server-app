import 'dotenv/config';

import express from 'express';
import Hello from './hello.js';
import Lab5 from './lab5.js';
import CourseRoutes from './courses/routes.js';
import ModuleRoutes from './Modules/routes.js';
import AssignmentRoutes from './Assignments/routes.js';

import cors from 'cors';
import mongoose from 'mongoose';
import UserRoutes from './users/routes.js';

const CONNECTION_STRING =
	process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';
mongoose.connect(CONNECTION_STRING);

import session from 'express-session';

const app = express();
app.use(
	cors({
		credentials: true,
		origin: process.env.FRONTEND_URL,
	})
);
const sessionOptions = {
	secret: 'any string',
	resave: false,
	saveUninitialized: false,
};
if (process.env.NODE_ENV !== 'development') {
	sessionOptions.proxy = true;
	sessionOptions.cookie = {
		sameSite: 'none',
		secure: true,
	};
}
app.use(session(sessionOptions));

app.use(express.json());
ModuleRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app);
UserRoutes(app);
Lab5(app);
Hello(app);

// app.listen(4000)
app.listen(process.env.PORT || 4000);
