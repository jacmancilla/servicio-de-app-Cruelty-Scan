const express = require('express')
const routes = express.Router()


// Obtener todos los  producto
routes.get('/productos', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query('SELECT * FROM producto', (err, rows) => {
            if (err) return res.send(err)
            res.json(rows)
        })
    })
})

// Obtener un producto por codigo de barra
routes.get('/productos/:cod_barra', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send(err)
        }
        conn.query('SELECT * FROM producto JOIN marca ON producto.id_marca = marca.id_marca WHERE producto.cod_barra=?', [req.params.cod_barra], async (err, rows) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).json(rows)
        })
    })
})

// Obtener un producto por id categorias
routes.get('/buscar/productos/idcategoria/:idcategoria', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send(err)
        }
        conn.query('SELECT * FROM producto JOIN categoria ON producto.id_categoria = categoria.id_categoria WHERE producto.id_categoria=?', [req.params.idcategoria], async (err, rows) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).json(rows)
        })
    })
})

// Obtener un producto por nombre categorias
routes.get('/buscar/productos/nombrecategoria', (req, res) => {
    const nombreCategoria = req.headers.categoria
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send(err)
        }
        conn.query('SELECT * FROM producto JOIN categoria ON producto.id_categoria = producto.id_categoria WHERE categoria.nom_categoria=?', [nombreCategoria], async (err, rows) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).json(rows)
        })
    })
})


// Agregar un nuevo producto
routes.post('/productos', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send(err)
        }

        conn.query('INSERT INTO producto SET ?', [req.body], (err, rows) => {
            if (err) {
                return res.status(500).send(err)
            }
            return res.status(200).send('Producto registrado')
        })
    })
})

// Actualizar un producto
routes.put('/productos/:cod_barra', (req, res) => {
    const cod_barra = req.params.cod_barra

    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send(err)
        }
        conn.query('UPDATE producto SET ? WHERE cod_barra=?', [req.body, cod_barra], (err, rows) => {
            if (err) {
                return res.status(500).send(err)
            }
            return res.status(200).send('Producto modificado')
        })
    })
})

module.exports = routes