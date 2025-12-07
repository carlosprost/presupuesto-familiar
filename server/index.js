const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');

const {
  getIngresos,
  addIngresos,
  deleteIngresos,
  updateIngresos,
  getEgresos,
  addEgresos,
  deleteEgresos,
  updateEgresos,
  getConfig,
  updateConfig
} = require("./controller");

// Middleware
app.use(express.json());
app.use(cors());

// Config Routes
app.get("/config", (req, res) => {
    getConfig().then((result) => {
        res.send(result);
    }).catch(err => res.status(500).send(err));
});

app.put("/config", (req, res) => {
    let config = req.body;
    updateConfig(config).then((result) => {
        res.send(result);
    }).catch(err => res.status(500).send(err));
});

// Serve static files from Angular build (Production)
// Adjust the path to where Angular builds the artifacts, typically ../dist/presupuesto-familiar/browser
const angularDistPath = path.join(__dirname, '../dist/presupuesto-familiar/browser');
app.use(express.static(angularDistPath));

// API Routes
app.get("/ingreso", (req, res) => {
  getIngresos().then((result) => {
    res.send(result);
  }).catch(err => res.status(500).send(err));
});

app.post("/ingreso", (req, res) => {
  let ingreso = req.body;
  addIngresos(ingreso).then((result) => {
    res.send(result);
  }).catch(err => res.status(500).send(err));
});

app.delete("/ingreso/:id", (req, res) => {
  let id = req.params.id;
  deleteIngresos(id).then((result) => {
    res.send({ id: result }); // Consistent response
  }).catch(err => res.status(500).send(err));
});

app.put("/ingreso", (req, res) => {
  let ingreso = req.body;
  updateIngresos(ingreso).then((result) => {
    res.send(result);
  }).catch(err => res.status(500).send(err));
});

app.get("/egreso", (req, res) => {
  getEgresos().then((result) => {
    res.send(result);
  }).catch(err => res.status(500).send(err));
});

app.post("/egreso", (req, res) => {
  let egreso = req.body;
  addEgresos(egreso).then((result) => {
    res.send(result);
  }).catch(err => res.status(500).send(err));
});

app.delete("/egreso/:id", (req, res) => {
  let id = req.params.id;
  deleteEgresos(id).then((result) => {
    res.send({ id: result });
  }).catch(err => res.status(500).send(err));
});

app.put("/egreso", (req, res) => {
  let egreso = req.body;
  updateEgresos(egreso).then((result) => {
    res.send(result);
  }).catch(err => res.status(500).send(err));
});

// Fallback to index.html for Angular routing
app.get('*', (req, res) => {
    res.sendFile(path.join(angularDistPath, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
