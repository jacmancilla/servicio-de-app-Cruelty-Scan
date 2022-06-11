const express = require('express')
const routes = express.Router()


//recibe los datos para loguearse
routes.post('/login', (req, res) => {
    const { correo, contra } = req.body

    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send(err)
        }
        //Busca los datos de contacto y los trae
        conn.query('SELECT * FROM contacto WHERE correo= ?', [correo], (err, contacto) => {
            if (err) {
                return res.status(500).send(err)
            }
            if (contacto.length === 0) {
                return res.status(500).send('Correo no encontrado')
            }
            const rut = contacto[0].rut

            //Busca los datos del usuario para obtener la contraseña
            conn.query('SELECT * FROM  usuario WHERE rut= ?', [rut], (err, usuario) => {
                if (err) {
                    return res.status(500).send(err)
                }
                //Valida si las contraseñas son iguales
                const contraBd = usuario[0].contra
                const tipoUsuario = usuario[0].id_tipo
                if (contraBd !== contra) {
                    return res.status(409).send('Contraseña no son iguales')
                }
                return res.status(200).json({ tipoUsuario })
            })
        })
    })
})

module.exports = routes