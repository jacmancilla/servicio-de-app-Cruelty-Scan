const express = require('express')
const routes = express.Router()
const multer = require('multer')
const storage = multer.memoryStorage();
const path = require('path')
const upload = multer({
    storage: storage
});
const fs = require('fs')


// Guardar imagen
const diskStorage = multer.diskStorage({
    destination: path.join(__dirname, '../images'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-crueltyscan-' + file.originalname)
    }
})
const fileUpload = multer({
    storage: diskStorage,
}).single('image')


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

// Obtener un producto
routes.get('/productos/:cod_barra', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send(err)
        }
        conn.query('SELECT * FROM producto WHERE cod_barra=?', [req.params.cod_barra], async (err, rows) => {
            if (err) {
                return res.status(500).send(err)
            }
            console.log(rows[0].imagen)
            var buffer = Buffer.from(rows[0].imagen, 'base64');
            const newFileName = 'nodejs.png';
            fs.writeFileSync(newFileName, buffer)
            // await fs.writeFile(`./${newFileName}`, buffer, 'utf-8').then(() => {
            //     res.status(200).sendFile(`${cwd}/${newFileName}`);
            // });
            res.status(200).json(rows)
        })
    })
})

// Agregar un nuevo producto
routes.post('/productos', fileUpload, (req, res) => {
    const { cod_barra, nom_producto, test, id_categoria, id_marca } = req.body

    const testGuardar = test === 'true' ? true : false
    console.log(req.file.path)
    var img = fs.readFileSync(req.file.path);
    var encode_img = img.toString('base64');
    var final_img = {
        contentType: req.file.mimetype,
        image: Buffer.from(encode_img, 'base64')
    };
    console.log(final_img)
    const guardar = {
        cod_barra,
        nom_producto,
        test: testGuardar,
        id_categoria: Number(id_categoria),
        id_marca: Number(id_marca),
        imagen: final_img
    }
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send(err)
        }

        conn.query('INSERT INTO producto SET ?', [guardar], (err, rows) => {
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