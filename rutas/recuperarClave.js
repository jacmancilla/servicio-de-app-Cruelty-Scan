const express = require('express')
const { enviarEmailRecuperar } = require('./enviarEmail')
const routes = express.Router()

// Recuperar clave paso 1 - envio de codigo por correo
routes.post('/recuperar-clave/paso1', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send(err)
        }
        conn.query('SELECT * FROM cliente JOIN contacto ON cliente.rut = contacto.rut WHERE contacto.correo=?', [req.body.correo], (err, rows) => {
            if (err) {
                return res.status(500).send(err)
            }
            enviarEmailRecuperar(rows[0].correo, rows[0].nombre_cliente, '123123')
            return res.status(200).send('email enviado')
        })
    })
})

// Recuperar clave paso 2 - validacion de codigo
routes.post('/recuperar-clave/paso2', (req, res) => {
    if (req.body.codigo === '123123') {
        return res.status(200).send('codigo valido')
    } else {
        return res.status(500).send('codigo invalido')
    }
})

// Recuperar clave paso 3 - cambio de contraseña
routes.put('/recuperar-clave/paso3', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send(err)
        }
        conn.query('SELECT * FROM cliente JOIN contacto ON cliente.rut = contacto.rut WHERE contacto.correo=?', [req.body.correo], (err, rowsCliente) => {
            if (err) {
                return res.status(500).send(err)
            }

            conn.query('UPDATE usuario SET contra=? WHERE rut=?', [req.body.clave, rowsCliente[0].rut], (err, rows) => {
                if (err) {
                    return res.status(500).send(err)
                }
                return res.status(200).send('contraseña actualizada')
            })
        })
    })
})





module.exports = routes