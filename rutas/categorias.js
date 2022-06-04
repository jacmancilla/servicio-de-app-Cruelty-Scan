const express = require('express')
const routes = express.Router()


// Obtener todas las categorias
routes.get('/categorias', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send(err)
        }
        conn.query('SELECT * FROM categoria', (err, rows) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).json(rows)
        })
    })
})


// Registrar una categoria
routes.post('/categorias', (req, res) => {

    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send(err)
        }

        conn.query('INSERT INTO categoria SET ?', [req.body], (err, rows) => {
            if (err) {
                return res.status(500).send(err)
            }
            return res.status(200).send('Categoria registrada')
        })
    })
})





module.exports = routes