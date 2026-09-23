import express from 'express';
import https from 'node:https';
import fs from 'node:fs';
import productsRoutes from '../routes/products.js';
const app = express();
// 1. Definimos texto plano para el body de peticiones GET desde frontend, permitiendo que este backend entienda texto plano, enviado por el frontend
app.use
(
    express.text
    (
        {
            type: 'text/plain',
            defaultCharset: 'utf-8'
        }
    )
);
// 2. Definimos json para el body de peticiones GET o envíos POST desde frontend, permitiendo que este backend entienda JSON, enviado por el frontend
app.use
(
    express.json
    (
        {
            type: 'application/json',
            strict: true,
            limit: '100kb',
            inflate: true
        }
    )
);
app.use('/api/productos', productsRoutes);
app.use
(
    (req, res) =>
    {
        res.status(404).json
        (
            {
                error: 'Endpoint no encontrado'
            }
        );
    }
);
const opcionesHTTPS = {
    key: fs.readFileSync
    (
        '/etc/letsencrypt/archive/www.luislopez.com.ar/privkey1.pem'
    ),
    cert: fs.readFileSync
    (
        '/etc/letsencrypt/archive/www.luislopez.com.ar/fullchain1.pem'
    )
};
const PORT = 3000;
https.createServer(opcionesHTTPS, app).listen
(
    PORT, () =>
    {
        console.log
        (
            `Servidor HTTPS escuchando en https://www.luislopez.com.ar:${PORT}`
        );
    }
);
