const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const swaggerOptions = {
	swaggerDefinition: {
		openapi: "3.0.0",
		info: {
			version: "1.0.0",
			title: "Simple REST API",
			description: "Developed by Sunil",
			contact: {
				name: "Sunil Gautam"
			},
			servers: ["http://localhost:7777"],
		}
	},
	apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);


module.exports = function(app) {
	app.use(
		"/api-docs", 
		swaggerUi.serve, 
		swaggerUi.setup(swaggerDocs, { explorer: true })
	)
}	