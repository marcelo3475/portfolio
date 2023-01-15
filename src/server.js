const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Crea la aplicación Express
const app = express();

// Configura body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Conecta a la base de datos MongoDB
mongoose.connect('mongodb://localhost/mydb');

// Crea el esquema de los datos
const dataSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

// Crea el modelo
const Data = mongoose.model('Data', dataSchema);

// Ruta para manejar la solicitud del formulario
app.post('/submit', (req, res) => {
  // Crea una nueva instancia del modelo
  const data = new Data({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  });

  // Guarda los datos en la base de datos
  data.save((err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Datos guardados correctamente.');
    }
  });
});

// Inicia el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000.');
});
