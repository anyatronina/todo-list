const PORT = 8080;
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const config = require("config");
const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", routes);

// app.get("/", (req, res) => {
//   const options = {
//     method: "GET",
//     url: config.get("API_ENDPOINT") + `/tasks?sort[0]=id:asc`,
//     headers: {
//       Authorization: `Bearer ` + config.get("JWT_TOKEN"),
//     },
//   };

//   axios
//     .request(options)
//     .then((response) => {
//       res.json(response.data.data);
//     })
//     .catch((error) => {
//       res.json(error);
//     });
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
