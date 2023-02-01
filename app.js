const axios = require("axios");
const express = require("express");

const PORT = 8080;

const app = express();

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

app.get("/", (req, res)=> {
  res.send("--->");
})

axios.get("http://0.0.0.0:8080/users/")
.then((result) => {
  console.log(result.data);
})
.catch((err) => {
  console.log(err);
})

axios.post("https://0.0.0.0.:8080/users/")
.then((result) => {
  console.log(result.data);
})
.catch((err) => {
  console.log(err);
})