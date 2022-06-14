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


module.exports = routes