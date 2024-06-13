const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require( 'cors' );
const Productos = require('./Controladores/Productos');
const Usuarios = require('./Controladores/Usuarios');
const Ventas = require('./Controladores/Ventas');
const PORT = "3000";
const corsOptions = {
    origin: 'http://localhost:4200'
};

const servidor = express();
servidor.use(session({secret: 'mi_secreto_secreto', resave: false, saveUninitialized: true}));
servidor.use(bodyParser.json());
servidor.use(cors(corsOptions));

servidor.post("/iniciarSesion", async (req, res)=>{
    const { correo, contrasena } = req.body;
    const usuarios = new Usuarios();
    const datos = await usuarios.iniciarSesion(correo, contrasena);
    res.json(datos);
});

servidor.post("/registrarUsuario", async (req, res)=>{
    const {identificacion, nombres, apellidos, cargo, correo, pregunta, respuesta, contrasena, telefono} = req.body;
    const usuarios = new Usuarios();
    const datos = await usuarios.registrarUsuario(identificacion, nombres, apellidos, cargo, telefono, correo, pregunta, respuesta, contrasena);
    res.json(datos);
});

servidor.post("/actualizarUsuario", async (req, res)=>{
    const {identificacion, nombres, apellidos, cargo, correo, identificacion_ant, telefono, pregunta, respuesta} = req.body;
    const usuarios = new Usuarios();
    const datos = await usuarios.actualizarUsuario(identificacion, nombres, apellidos, cargo, telefono, correo, pregunta, respuesta, identificacion_ant);
    res.json(datos);
});

servidor.post("/listarUsuarios", async (req, res)=>{
    const usuarios = new Usuarios();
    const datos = await usuarios.listarUsuarios();
    res.json(datos);
});

servidor.post("/eliminarUsuario", async (req, res)=>{
    const {identificacion} = req.body;
    const usuarios = new Usuarios();
    const data = await usuarios.inhabilitarUsuario(identificacion);
    res.json(data);
});

servidor.post("/listaCargos", async (req, res)=>{
    const usuarios = new Usuarios();
    const datos = await usuarios.listaCargos();
    res.json(datos);
});

servidor.post("/usuarioEspecifico", async (req, res)=>{
    const {identificacion} = req.body;
    const usuarios = new Usuarios();
    const datos = await usuarios.usuarioEspecifico(identificacion);
    res.json(datos);
});

servidor.post("/listadoProductos", async (req, res)=>{
    const productos = new Productos();
    const datos = await productos.listarProductos();
    res.json(datos);
});

servidor.post("/actualizarProducto", async (req, res)=>{
    const {serial, nombre, precio, categoria, marca, cantidad, descripcion, imagen, serial_ant } = req.body
    const productos = new Productos();
    const datos = await productos.actualizarProducto(serial,nombre,precio, categoria, marca, cantidad, descripcion, imagen, serial_ant);
    res.json(datos);
});

servidor.post("/obtenerCategorias", async (req, res)=>{
    const productos = new Productos();
    const datos = await productos.obtenerCategorias();
    res.json(datos);
});

servidor.post("/obtenerMarcas", async (req, res)=>{
    const productos = new Productos();
    const datos = await productos.obtenerMarcas();
    res.json(datos);
});

servidor.post("/eliminarProducto", async (req, res)=>{
    const {serial} = req.body;
    const productos = new Productos();
    const datos = await productos.eliminarProducto(serial);
    res.json(datos);
});

servidor.post("/registrarProducto", async (req, res) => {
    const { serial, nombre, categoria, precio, marca, descripcion, cantidad } = req.body;
    const imagen = req.file ? req.file.filename : "";

    console.log("Datos recibidos:", { serial, nombre, categoria, precio, marca, descripcion, cantidad, imagen });

    const productos = new Productos();
    try {
        const datos = await productos.registrarProducto(serial, nombre, precio, categoria, marca, cantidad, descripcion, imagen);
        res.json(datos);
    } catch (error) {
        console.error("Error al registrar el producto:", error);
        res.status(500).json({ respuesta: false, error: error.message });
    }
});

servidor.get("/obtenerListaVentas/:cliente", async (req, res)=>{
    const {cliente} = req.params;
    const ventas = new Ventas();
    const datos = await ventas.obtenerListaVentas(cliente);
    res.json(datos);
});

servidor.post("/obtenerListaVentas", async (req, res)=>{
    const {cliente} = req.params;
    const ventas = new Ventas();
    const datos = await ventas.obtenerListaVentas(cliente);
    res.json(datos);
});

servidor.post("/obtenerListaPedidos", async (req, res)=>{
    const {serial, cliente} = req.body
    const ventas = new Ventas();
    const datos = await ventas.obtenerListaPedidos(serial, cliente);
    res.json(datos)
});

servidor.post("/actualizarVenta", async(req, res)=>{
    const {serial, fecha, cliente, cantidad, precio, total, pedidos} = req.body;
    const ventas = new Ventas();
    const datosVenta = await ventas.actualizarVenta(serial, fecha, cliente, cantidad, precio, total, pedidos);
    res.json(datosVenta);
});

servidor.post("/pagarVenta", async (req, res)=>{
    const {serial}=req.body;
    const ventas = new Ventas();
    const datos = await ventas.pagarVenta(serial);
    res.json(datos);
});

servidor.post("/eliminarVenta", async(req, res)=>{
    const {serial} = req.body;
    const ventas = new Ventas();
    const datos = await ventas.eliminarVenta(serial);
    res.json(datos);
});

servidor.post("/registrarPedido", async(req, res)=>{
    const {cliente, producto, cantidad, precio, subtotal} = req.body;
    const ventas = new Ventas();
    const datos = await ventas.registrarPedido(cliente, producto, cantidad, precio, subtotal);
    res.json(datos);
});

servidor.post("/eliminarPedido", async(req, res)=>{
    const {id} = req.body
    const ventas = new Ventas();
    const datos = await ventas.eliminarPedido(id);
    res.json(datos);
})

servidor.post("/facturarPedido", async(req, res)=>{
    const {pedido, cliente} = req.body
    const ventas = new Ventas();
    const datos = await ventas.facturarPedido(pedido, cliente);
    res.json(datos);
});

servidor.post("/facturarCarrito", async(req, res)=>{
    const {cliente, pedidos} = req.body
    const ventas = new Ventas();
    const datos = await ventas.facturarCarrito(cliente, pedidos);
    res.json(datos);
})


servidor.listen(PORT, (req, res)=>{
    console.log('SERVIDOR CORRIENDO, PUERTO:' + PORT);
});