const express = require("express");
const routes = require("./routes");

const app = express();
const port = 3000;

routes(app);
// this method is to transform or to trate the request body.
// app.use(bodyParser.json());

app.listen(port, (req, res) => {
  console.log(`listening on port ${port}`);
});
