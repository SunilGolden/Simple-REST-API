const { validateCourses } = require("../models/courses");
const express = require("express");
const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *   Course:
 *    type: object
 *    properties:
 *     id:
 *      type: integer
 *     semester:
 *      type: string
 *     subject:
 *      type: string
 *     requiresLab:
 *      type: boolean
 *     credits:
 *      type: integer
 *    required:
 *     - subject
 *     - requiresLab
 *     - credits
 *    example:
 *     id: 5
 *     semester: VII
 *     subject: Object Oriented Software Development
 *     requiresLab: true
 *     credits: 3
 */

let courses = [
	{
		"id": 1,
		"semester": "VI",
		"subject": "Multimedia Systems",
		"requiresLab": true,
		"credits": 3
	},
	{
		"id": 2,
		"semester": "VI",
		"subject": "Computer Networks",
		"requiresLab": true,
		"credits": 3
	},
	{
		"id": 3,
		"semester": "VI",
		"subject": "Principles of Programming Languages",
		"requiresLab": true,
		"credits": 3
	},
	{
		"id": 4,
		"semester": "VI",
		"subject": "Engineering Economics",
		"requiresLab": false,
		"credits": 3
	},
	{
		"id": 5,
		"semester": "VI",
		"subject": "Object Oriented Software Development",
		"requiresLab": true,
		"credits": 3
	},
	{
		"id": 6,
		"semester": "VI",
		"subject": "Project II",
		"requiresLab": true,
		"credits": 2
	}
]


/**
* @swagger
*
* /api/course:
*  get:
*   summary: Returns the list of all the courses
*   tags: [Course]
*   responses:
*     '200':
*       description: The list of all the courses
*       content:
*        application/json:
*         schema:
*          type: array
*          items:
*           $ref: '#/components/schemas/Course'
*     '500':
*       description: Internal server error
*/
router.get("/", (req, res) => {
    const data = courses;

    res.send(data);
});


/**
* @swagger
*
* /api/course/{id}:
*  get:
*   summary: Get the course by id
*   tags: [Course]
*   parameters:
*    - in: path
*      name: id
*      schema:
*       type: string
*      required: true
*      description: Course id
*   responses:
*     '200':
*       description: The description of the course by id
*       content:
*        application/json:
*         schema:
*          $ref: '#/components/schemas/Course'
*     '404':
*       description: The course with the given id does not exist
*     '500':
*       description: Internal server error
*/
router.get("/:id", (req, res) => {
    const data = courses.find(i => i.id === parseInt(req.params.id));
    
    if (!data)
    	res.status(404).send("Data with the given id was not found.");

    res.send(data);
});


/**
* @swagger
*
* /api/course:
*  post:
*   summary: Create a new course
*   tags: [Course]
*   requestBody:
*    required: true
*    content:
*     application/json:
*      schema:
*       $ref: '#/components/schemas/Course'
*   responses:
*     '200':
*       description: The course was created successfully
*       content:
*        application/json:
*         schema:
*          $ref: '#/components/schemas/Course'
*     '500':
*       description: Internal server error
*/
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
		"semester": req.body.semester,
		"subject": req.body.subject,
		"requiresLab": req.body.requiresLab,
		"credits": req.body.credits
	};

	courses.push(data);
    res.send(data);
});


/**
* @swagger
*
* /api/course/{id}:
*  put:
*   summary: Update the existing course by id
*   tags: [Course]
*   parameters:
*    - in: path
*      name: id
*      schema:
*       type: string
*      required: true
*      description: Course id
*   requestBody:
*    required: true
*    content:
*     application/json:
*      schema:
*       $ref: '#/components/schemas/Course'
*   responses:
*     '200':
*       description: The course was updated successfully
*       content:
*        application/json:
*         schema:
*          $ref: '#/components/schemas/Course'
*     '404':
*       description: The course with the given id was not found
*     '500':
*       description: Internal server error
*/
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

	data.semester = req.body.semester;
	data.subject = req.body.subject;
	data.requiresLab = req.body.requiresLab;
	data.credits = req.body.credits;

    res.send(data);
});


/**
* @swagger
*
* /api/course/{id}:
*  delete:
*   summary: Delete the course by id
*   tags: [Course]
*   parameters:
*    - in: path
*      name: id
*      schema:
*       type: string
*      required: true
*      description: Course id
*   responses:
*     '200':
*       description: Course deleted successfully
*     '404':
*       description: No course with that id
*     '500':
*       description: Internal server error
*/
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