const express = require("express");
const app = express();
const cors = require("cors");

const {
    getIngresos,
    addIngresos,
    deleteIngresos,
    updateIngresos,
    getEgresos
} = require("./query");

/* //Middleware
app.use(cors);
app.use(express.json()); */

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/ingreso", (req, res) => {
    console.log(getIngresos().values);
    res.send(getIngresos().values);

});

app.post("/ingreso", (req, res) => {
    let ingreso = req.body;
    res.send(addIngresos(ingreso))
});

app.delete("/ingreso/:id", (req, res) => {
    let id = req.params.id;
    res.send(deleteIngresos(id));
});

app.put("/ingreso", (req, res) => {
    let ingreso = req.body;
    res.send(updateIngresos(ingreso));
});

app.get("/egreso", (req, res) => {
    console.log(getEgresos());
  res.send(getEgresos());
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
