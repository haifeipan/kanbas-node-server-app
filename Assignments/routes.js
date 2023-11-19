import db from '../Database/index.js';
function AssignmentRoutes(app) {
	app.delete('/api/assignments/:aid', (req, res) => {
		const { aid } = req.params;
		db.assignments = db.assignments.filter((a) => a._id !== aid);
		res.sendStatus(200);
	});

	app.put('/api/assignments/:aid', (req, res) => {
		//console.log("==============begin update=========");
		const { aid } = req.params;
		const assignmentIndex = db.assignments.findIndex((a) => a._id === aid);
		// console.log('aid = ' + aid);
		// console.log('update successfully');

		db.assignments[assignmentIndex] = {
			...db.assignments[assignmentIndex],
			...req.body,
		};
		res.sendStatus(204);
	});

	app.post('/api/courses/:cid/assignments', (req, res) => {
		const { cid } = req.params;
		const newAssignment = {
			...req.body,
			course: cid,
			_id: new Date().getTime().toString(),
		};
		db.assignments.push(newAssignment);
		res.send(newAssignment);
	});

	app.get('/api/courses/:cid/assignments', (req, res) => {
		const { cid } = req.params;
		// console.log('cid =' + cid);
		//   const modules = db.modules.filter((m) => m.course === cid);

		const assignments = db.assignments.filter((a) => a.course === cid);

		//   const modules = db.modules
		//   .filter((m) => m.course_id === cid);
		res.send(assignments);
	});
}
export default AssignmentRoutes;
