const express = require("express");
const app = express();
const cors = require("cors");

const {
  getIngresos,
  addIngresos,
  deleteIngresos,
  updateIngresos,
  fechaActual,
  getEgresos,
  addEgresos,
  deleteEgresos,
  updateEgresos,
} = require("./query");

//Middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
  console.log(fechaActual());
});

app.get("/ingreso", (req, res) => {
  getIngresos().then((result) => {
    res.send(result[0]);
  });
});

app.post("/ingreso", (req, res) => {
  let ingreso = req.body;
  console.log(ingreso);
  addIngresos(ingreso).then((result) => {
    res.send(result[0]);
  });
});

app.delete("/ingreso/:id", (req, res) => {
  let id = req.params.id;
  deleteIngresos(id).then((result) => {
    res.send(result);
  });
});

app.put("/ingreso", (req, res) => {
  let ingreso = req.body;
  updateIngresos(ingreso).then((result) => {
    res.send(result);
  });
});

app.get("/egreso", (req, res) => {
  getEgresos().then((result) => {
    res.send(result[0]);
  });
});

app.post("/egreso", (req, res) => {
  let egreso = req.body;
  addEgresos(egreso).then((result) => {
    res.send(result[0]);
  });
});

app.delete("/egreso/:id", (req, res) => {
  let id = req.params.id;
  deleteEgresos(id).then((result) => {
    res.send(result);
  });
});

app.put("/egreso", (req, res) => {
  let egreso = req.body;
  updateEgresos(egreso).then((result) => {
    res.send(result);
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
