const express = require('express')
const mysql = require('mysql')
const myconn = require('express-myconnection')
const res = require('express/lib/response')
var bodyParser = require('body-parser')

const routesClientes = require('./rutas/clientes')
const routesProductos = require('./rutas/productos')
const routesComuna = require('./rutas/comunas')
const routesRegion = require('./rutas/regiones')
const routesUsuario = require('./rutas/usuario')
const routesCategoria = require('./rutas/categorias')
const routesMarca = require('./rutas/marcas')
// const routesMascotas = require('./rutas/mascotas')
// const routesProductofav = require('./rutas/producto_fav')
// const routesLogin = require('./rutas/login')



const app = express()
app.use(express.json())

app.set('port', process.env.PORT || 9000)
const dbOptions = {
    host: 'crueltyscan.mysql.database.azure.com',
    port: 3306,
    user: 'usuario_scan',
    password: 'Admin2022',
    database: 'crueltyscan'
}

//middlewares---
app.use(myconn(mysql, dbOptions, 'single'))

//routes-------
app.get('/', (req, res) => (
    res.send('Bienvenido a la api')
))

app.use('/api', routesClientes)
app.use('/api', routesProductos)
app.use('/api', routesComuna)
app.use('/api', routesRegion)
app.use('/api', routesUsuario)
app.use('/api', routesCategoria)
app.use('/api', routesMarca)
// app.use('/api', routesMascotas)
// app.use('/api', routesProductofav)
// app.use('/api', routesLogin)



//server running----
app.listen(app.get('port'), () => {
    console.log('server running on port', app.get('port'))
})

