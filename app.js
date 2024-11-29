const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();

// Configuración para el uso de peticiones POST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Para manejar datos JSON

// Habilita CORS para todas las rutas
app.use(cors());

// Servir archivos estáticos (CSS, imágenes, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Crear la conexión
const db = mysql.createConnection({
    host: 'localhost', // server
    user: 'root', // usuario de la DB
    password: '', // pass de tu DB
    database: 'proyecto_pw', // nombre de la base de datos
    port: 3306 // puerto
});

// Comprobación de la conexión de la base de datos
db.connect(err => {
    if (err) {
        console.log(`Error no te haz podido conectar BB ${err}`);
    } else {
        console.log(`Conectado a tu base de datos`);
    }
});

// Ruta para mostrar el formulario
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // Servir el archivo HTML con el formulario
});

// Agregar
app.post('/agregar', (req, res) => {
    const { Nombre, Apellidos, Genero, Edad, "Nombre de Usuario": NombreDeUsuario, Consola, "Correo Electronico": CorreoElectronico, "Numero Telefonico": NumeroTelefonico } = req.body; // Obtener los datos del formulario
    // Comando SQL para insertar datos
    const sql = 'INSERT INTO jugadores (Nombre, Apellidos, Genero, Edad, `Nombre de Usuario`, Consola, `Correo Electronico`, `Numero Telefonico`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    // Ejecutar el comando SQL
    db.query(sql, [Nombre, Apellidos, Genero, Edad, NombreDeUsuario, Consola, CorreoElectronico, NumeroTelefonico], (err, result) => {
        if (err) {
            console.error(`Error al insertar datos: ${err.message}`);
            res.status(500).send('No se pudo agregar al jugador');
        } else {
            // Después de agregar el jugador, obtenemos la lista de jugadores
            const sqlGet = 'SELECT * FROM jugadores';
            db.query(sqlGet, (err, results) => {
                if (err) {
                    console.error(`Error al obtener la lista de jugadores: ${err.message}`);
                    res.status(500).send('Hubo un error al obtener la lista de jugadores');
                } else {
                    // Enviamos la lista actualizada de jugadores como respuesta
                    res.json(results);
                }
            });
        }
    });
});

// Listar jugadores
app.get('/listar', (req, res) => {
    const sql = 'SELECT * FROM jugadores';
    db.query(sql, (err, results) => {
        if (err) {
            console.error(`Error al listar jugadores: ${err.message}`);
            res.status(500).send('Hubo un error al seleccionar jugadores');
        } else {
            res.json(results); 
        }
    });
});

// Editar jugador
app.post('/editar/:id', (req, res) => {
    const { id } = req.params;
    const { Nombre, Apellidos, Genero, Edad, "Nombre de Usuario": NombreDeUsuario, Consola, "Correo Electronico": CorreoElectronico, "Numero Telefonico": NumeroTelefonico } = req.body;
    const sql = `UPDATE jugadores SET Nombre = ?, Apellidos = ?, Genero = ?, Edad = ?, \`Nombre de Usuario\` = ?, Consola = ?, \`Correo Electronico\` = ?, \`Numero Telefonico\` = ? WHERE id = ?`;
    db.query(sql, [Nombre, Apellidos, Genero, Edad, NombreDeUsuario, Consola, CorreoElectronico, NumeroTelefonico, id], (err, result) => {
        if (err) {
            console.error(`Error al editar jugador: ${err.message}`);
            res.status(500).send('No se pudo modificar al jugador');
        } else {
            console.log('Jugador modificado:', result);
            res.send('Se modifico correctamente al jugador');
        }
    });
});

// Eliminar jugador
app.post('/eliminar/:id', (req, res) => {
    const { id } = req.params;
    const sqlDelete = `DELETE FROM jugadores WHERE id = ?`;
    db.query(sqlDelete, [id], (err, result) => {
        if (err) {
            console.error(`Error al eliminar jugador: ${err.message}`);
            res.status(500).send('Hubo un error al eliminar jugador');
        } else {
            console.log('jugador eliminado:', result);
            res.send('El jugador ha sido eliminado');
        }
    });
});

// Iniciar el servidor
const port = 3009;
app.listen(port, () => {
    console.log(`Servidor en funcionamiento desde http://localhost:${port}`);
});
