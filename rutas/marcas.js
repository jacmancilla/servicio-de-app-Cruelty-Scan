const express = require('express')
const routes = express.Router()

// Obtener todas las marcas
routes.get('/marcas', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send(err)
        }
        conn.query('SELECT * FROM marca', (err, rows) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).json(rows)
        })
    })
})

// Obtener una marca
routes.get('/marcas/:id_marca', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send(err)
        }
        conn.query('SELECT * FROM marca WHERE id_marca=?', [req.params.id_marca], (err, rows) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).json(rows)
        })
    })
})

// Registrar una nueva marca
routes.post('/marcas', (req, res) => {

    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send(err)
        }

        conn.query('INSERT INTO marca SET ?', [req.body], (err, rows) => {
            if (err) {
                return res.status(500).send(err)
            }
            return res.status(200).send('Marca registrada')
        })
    })
})

// Actualizar una marca
routes.put('/marcas/:id_marca', (req, res) => {
    const id_marca = req.params.id_marca

    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send(err)
        }
        conn.query('UPDATE marca SET ? WHERE id_marca=?', [req.body, id_marca], (err, rows) => {
            if (err) {
                return res.status(500).send(err)
            }
            return res.status(200).send('Marca modificada')
        })
    })
})


module.exports = routes