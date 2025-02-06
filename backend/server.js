const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

// Configuración de la aplicación Express
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Configuración de la conexión a MySQL
const db = mysql.createConnection({
    host: '52.20.16.17',
    user: 'movistarmysql',
    password: 'MovSoft2018',
    database: 'EXAMEN'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Ruta para obtener todos los vehiculos
app.get('/api/vehiculos', (req, res) => {
    db.query('SELECT * FROM vehiculos', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Ruta para crear un nuevo vehiculo
app.post('/api/vehiculos', (req, res) => {
    const nuevoVehiculo = req.body;
    db.query('INSERT INTO vehiculos SET ?', nuevoVehiculo, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).send(`Vehículo añadido con placa: ${nuevoVehiculo.placa}`);
    });
});

// Ruta para actualizar un vehiculo
app.put('/api/vehiculos/:placa', (req, res) => {
    const actualizarVehiculo = req.body;
    const { placa } = req.params;
    db.query('UPDATE vehiculos SET ? WHERE placa = ?', [actualizarVehiculo, placa], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(`Vehículo actualizado con placa: ${placa}`);
    });
});

// Ruta para eliminar un vehiculo
app.delete('/api/vehiculos/:placa', (req, res) => {
    const { placa } = req.params;
    db.query('DELETE FROM vehiculos WHERE placa = ?', [placa], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(`Vehículo eliminado con placa: ${placa}`);
    });
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
