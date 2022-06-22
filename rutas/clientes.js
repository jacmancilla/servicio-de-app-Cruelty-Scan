const express = require('express')
const routes = express.Router()
const { enviarEmailRegistro } = require('./enviarEmail')

// Obtener todos cliente
routes.get('/clientes', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send(err)
        }
        conn.query('SELECT * FROM cliente', (err, rows) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).json(rows)
        })
    })
})

// Obtener un cliente
routes.get('/cliente/:rut', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send(err)
        }
        conn.query('SELECT * FROM cliente JOIN contacto ON cliente.rut = contacto.rut JOIN usuario ON cliente.rut = usuario.rut WHERE contacto.rut=?', [req.params.rut], (err, rows) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).json(rows)
        })
    })
})

// Agregar un nuevo cliente
routes.post('/cliente', (req, res) => {
    const { rut, id_comuna, nombre_cliente, apellido_pa, apellido_ma, correo, celular, contra } = req.body

    const llenarCliente = {
        rut,
        nombre_cliente,
        apellido_pa,
        apellido_ma,
        id_comuna,
    }

    const llenarUsuario = {
        rut,
        contra,
        id_tipo: 2
    }

    const llenarContacto = {
        rut,
        correo,
        celular
    }

    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send(err)
        }
        conn.query('INSERT INTO usuario SET ?', [llenarUsuario], (err, rows) => {
            if (err) {
                return res.status(500).send(err)
            }
            conn.query('INSERT INTO contacto SET ?', [llenarContacto], (err, rows) => {
                if (err) {
                    return res.status(500).send(err)
                }
                conn.query('INSERT INTO cliente SET ?', [llenarCliente], (err, rows) => {
                    if (err) {
                        return res.status(500).send(err)
                    }

                    enviarEmailRegistro(correo, nombre_cliente)
                    return res.status(200).send('Registro creado')
                })
            })
        })
    })
})

// Actualizar un cliente
routes.put('/cliente/:rut', (req, res) => {
    const rut = req.params.rut
    const { id_comuna, nombre_cliente, apellido_pa, apellido_ma, correo, celular, contra } = req.body

    const llenarCliente = {
        rut,
        nombre_cliente,
        apellido_pa,
        apellido_ma,
        id_comuna,
    }

    const llenarUsuario = {
        rut,
        contra,
        id_tipo: 1
    }

    const llenarContacto = {
        rut,
        correo,
        celular
    }

    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send(err)
        }
        conn.query('UPDATE usuario SET ? WHERE rut=?', [llenarUsuario, rut], (err, rows) => {
            if (err) {
                return res.status(500).send(err)
            }
            conn.query('UPDATE contacto SET ? WHERE rut=?', [llenarContacto, rut], (err, rows) => {
                if (err) {
                    return res.status(500).send(err)
                }
                conn.query('UPDATE cliente SET ? WHERE rut=?', [llenarCliente, rut], (err, rows) => {
                    if (err) {
                        return res.status(500).send(err)
                    }
                    return res.status(200).send('Registro modificado')
                })
            })
        })
    })
})

module.exports = routes