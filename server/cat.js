const express = require("express");
const router = express.Router();

let catDB = [
  {
    name: "butterscotch",
    breed: "calico",
    weight: "15",
  },
  {
    name: "mooshu",
    breed: "short-haired",
    weight: "10",
  },
];

router.get("/", (req, res) => {
  res.send({
    body: catDB,
  });
});

router.get("/:name", (req, res) => {
  const { name } = req.params;
  const cat = catDB.find((cat) => cat.name === name);
  res.send({
    body: cat,
  });
});

module.exports = router;
