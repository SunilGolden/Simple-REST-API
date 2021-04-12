const express = require("express");
const app = express();

require("./startup/routes")(app);
require("./startup/swagger")(app);


const port = process.env.PORT || 7777;

const server = app.listen(port, () =>
	console.log(`Listening on port ${port}...`)
);


module.exports = server;