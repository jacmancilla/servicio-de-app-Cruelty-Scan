const express = require('express')
const routes = express.Router()

//añade producto a favorito
routes.post('/producto-favorito', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send(err)
        }

        conn.query('INSERT INTO prod_favorito SET ?', [req.body], (err, rows) => {
            if (err) {
                return res.status(500).send(err)
            }
            return res.status(200).send('Producto Agregado a Favoritos')
        })
    })
})
//Obtener producto favorito por rut
routes.get('/producto-favorito', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send(err)
        }
        conn.query('SELECT * FROM prod_favorito WHERE rut=? and cod_barra=?', [req.headers.rut, req.headers.cod_barra], (err, rows) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).json(rows)
        })
    })
})

module.exports = routes