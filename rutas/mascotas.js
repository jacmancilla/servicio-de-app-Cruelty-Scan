const express = require('express')
const routes = express.Router()

// Obtener todas las mascotas
routes.get('/mascotas', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query('SELECT * FROM mascota WHERE adoptado=0', (err, rows) => {
            if (err) return res.send(err)
            res.json(rows)
        })
    })

})

// Agregar una nueva mascota
routes.post('/mascotas', (req, res) => {

    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send(err)
        }

        conn.query('INSERT INTO mascota SET ?', [req.body], (err, rows) => {
            if (err) {
                return res.status(500).send(err)
            }
            return res.status(200).send('Macota registrada')
        })
    })
})


// Actualizar si una mascota fue adoptada
routes.post('/adoptar/:id_animal', (req, res) => {
    const id_animal = req.params.id_animal


    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send(err)
        }

        conn.query('UPDATE mascota SET adoptado=1 WHERE id_animal=?', [id_animal], (err, rows) => {
            if (err) {
                return res.status(500).send(err)
            }
            return res.status(200).send('Mascota adoptada')
        })
    })
})

module.exports = routes