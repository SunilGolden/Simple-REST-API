const { validateCourses } = require("../models/courses");

const express = require("express");
const router = express.Router();


let courses = [
	{
		"id": 1,
		"semster": "VI",
		"subject": "Multimedia Systems",
		"requiresLab": true,
		"credits": 3
	},
	{
		"id": 2,
		"semster": "VI",
		"subject": "Computer Networks",
		"requiresLab": true,
		"credits": 3
	},
	{
		"id": 3,
		"semster": "VI",
		"subject": "Principles of Programming Languages",
		"requiresLab": true,
		"credits": 3
	},
	{
		"id": 4,
		"semster": "VI",
		"subject": "Engineering Economics",
		"requiresLab": false,
		"credits": 3
	},
	{
		"id": 5,
		"semster": "VI",
		"subject": "Object Oriented Software Development",
		"requiresLab": true,
		"credits": 3
	},
	{
		"id": 6,
		"semster": "VI",
		"subject": "Project II",
		"requiresLab": true,
		"credits": 2
	}
]


router.get("/", (req, res) => {
    const data = courses;

    res.send(data);
});


router.get("/:id", (req, res) => {
    const data = courses.find(i => i.id === parseInt(req.params.id));
    
    if (!data)
    	res.status(404).send("Data with the given id was not found.");

    res.send(data);
});


router.post("/", (req, res) => {
	const result = validateCourses(req.body);
	if (result.error) {
		res.status(400).send(result.error.details[0].message);
		return;
	}

    ids = courses.map(i => i.id);

    // Sort in descending order
    ids.sort(function(a, b){return b - a});
    // Set id to highest value of ids + 1
    id = ids[0] + 1;

    const data = {
		"id": id,
		"semster": req.body.semster,
		"subject": req.body.subject,
		"requiresLab": req.body.requiresLab,
		"credits": req.body.credits
	};

	courses.push(data);
    res.send(data);
});


router.put("/:id", (req, res) => {
    const data = courses.find(i => i.id === parseInt(req.params.id));
    if (!data) {
    	res.status(404).send("Data with the given id was not found.");
    	return;
    }

    const result = validateCourses(req.body);
	if (result.error) {
		res.status(400).send(result.error.details[0].message);
		return;
	}

	data.semster = req.body.semster;
	data.subject = req.body.subject;
	data.requiresLab = req.body.requiresLab;
	data.credits = req.body.credits;

    res.send(data);
});


router.delete("/:id", (req, res) => {
    const data = courses.find(i => i.id === parseInt(req.params.id));
    if (!data) {
    	res.status(404).send("Data with the given id was not found.");
    	return;
    }

    const index = courses.indexOf(data);
    courses.splice(index, 1);

    res.send(data);
});


module.exports = router;