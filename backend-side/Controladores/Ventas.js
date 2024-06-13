class Ventas {
    
    constructor(){
        this.peticionesDB = require("./baseDeDatos");
        this.Productos = require("./Productos");
    }

    registrarVenta(pedidos, venta){
        if(pedidos.length > 0 && venta.cliente != ""){
            try{
                const {cliente, fecha, pago_parcial, total} = venta;
                let estado = "Pendiente";
                if(pago_parcial == total){
                    estado = "Pagada"
                }
                const resultadoRegistroVenta = this.peticionesDB.query(`INSERT INTO ventas(cliente, fecha, pago_parcial, total, estado) VALUES (?,?,?,?,?)`, {cliente, fecha, pago_parcial, total, estado});
                if(resultadoRegistroVenta[0].affectedRows > 0){
                    console.log(resultadoRegistroVenta);
                    const codigo_venta = resultadoRegistroVenta[0].insertId
                    pedidos.forEach(pedido => {
                        const {codigo_producto, cantidad, precio} = pedido
                        const subtotal = cantidad * precio;
                        const registroPedido = this.peticionesDB.query(`INSERT INTO pedidos(codigo_venta, codigo_producto, precio, cantidad, subtotal) VALUES (?,?,?,?,?)`,{codigo_venta, codigo_producto, precio, cantidad, subtotal})
                        if(registroPedido[0].affectedRows > 0){
                            console.log("Se registro el pedido")
                        } else {
                            console.log("No se pudo registrar el pedido")
                        }
                    });
                } else {
                    return {respuesta:false, venta:""}
                }
            } catch (error){
                console.log(error);
            }
        }
    }

    async obtenerProductos(){
        try{
            const resultado = await this.peticionesDB.query("SELECT * FROM productos WHERE estado = 'A'")
            if(resultado[0].length > 0){
                return {respuesta:true, productos:resultado[0]}
            } else {
                return {respuesta:false, productos:[]}
            }
        } catch (error){
            console.log(error);
            return {respuesta:false, productos:[]}
        }
    }

    async obtenerListaVentas(cliente){
        try{
            let resultado;
            if(!cliente){
                resultado = await this.peticionesDB.query(`SELECT ventas.*, CONCAT(usuarios.nombres, ' ' , usuarios.apellidos) AS cliente_v FROM ventas, usuarios 
                                                            WHERE ventas.cliente = usuarios.identificacion`);
            } else {
                resultado = await this.peticionesDB.query(`SELECT ventas.*, CONCAT(usuarios.nombres, ' ' , usuarios.apellidos) AS cliente_v FROM ventas, usuarios 
                                                            WHERE ventas.cliente = usuarios.identificacion AND usuarios.identificacion = ?`, [cliente]);
            }
            if(resultado[0].length > 0){
                return {respuesta:true, ventas:resultado[0]}
            } else {
                return {respuesta:false, ventas:[]}
            }
        } catch (error){
            console.log(error);
            return {respuesta:false, ventas:[]}
        }
    }

    async obtenerListaPedidos(serial, cliente){
        try{
            let resultado;
            if(serial != ""){ 
                resultado = await this.peticionesDB.query(`SELECT pedidos.*, productos.nombre as producto_v FROM pedidos
                JOIN ventas ON pedidos.codigo_venta = ventas.codigo JOIN productos ON productos.serial = pedidos.codigo_producto 
                WHERE ventas.codigo = ? AND ventas.estado != 'Anulada';`, [serial]);
            } else {
                resultado = await this.peticionesDB.query(`SELECT pedidos.*, productos.nombre AS producto_v FROM pedidos LEFT JOIN ventas ON pedidos.codigo_venta = ventas.codigo 
                JOIN productos ON productos.serial = pedidos.codigo_producto WHERE pedidos.cliente = ? AND pedidos.codigo_venta = 0;`, [cliente])
            }
            console.log(resultado)
            if(resultado[0].length > 0){
                return {respuesta:true, pedidos:resultado[0]}
            } else {
                return {respuesta:false, pedidos:[]}
            }
        } catch (error){
            console.log(error);
            return {respuesta:false, pedidos:[]}
        }
    }

    async actualizarVenta(serial, fecha, cliente, pago_parcial, cantidad, total, pedidos) {
        try {
            // Iniciar una transacción
           
    
            // Actualizar la venta
            const resultadoVenta = await this.peticionesDB.query(`
                UPDATE ventas 
                SET fecha = ?, cliente = ?, pago_parcial = ?, cantidad = ?, total = ? 
                WHERE codigo_venta = ?`, 
                [fecha, cliente, pago_parcial, cantidad, total, serial]);
    
            // Actualizar los pedidos
            let pedidosActualizados = true;
            for (const pedido of pedidos) {
                const resultadoPedido = await this.peticionesDB.query(`
                    UPDATE pedidos 
                    SET codigo_producto = ?, precio = ?, cantidad = ?, subtotal = ? 
                    WHERE id = ?`,
                    [pedido.codigo_producto, pedido.precio, pedido.cantidad, pedido.subtotal, pedido.id]);
    
                if (resultadoPedido[0].affectedRows === 0) {
                    pedidosActualizados = false;
                    break;
                }
            }
    
            // Completar la transacción si todo fue exitoso
            if (resultadoVenta[0].affectedRows > 0 && pedidosActualizados) {
                await this.peticionesDB.commit();
                return { respuesta: true };
            } else {
                // Revertir la transacción si hubo algún error
                await this.peticionesDB.rollback();
                return { respuesta: false, mensaje: "No se pudo actualizar la venta o los pedidos." };
            }
        } catch (error) {
            // Manejar errores y revertir la transacción
            console.log(error);
           
            return { respuesta: false, mensaje: "Error en la base de datos." };
        }
    }
    
    async obtenerPedidosCliente(cliente){
        try{
            const resultado = await this.peticionesDB.query(`SELECT p.id, p.codigo_producto, p.precio, p.cantidad, p.subtotal FROM pedidos p INNER JOIN ventas v ON p.codigo_venta = v.codigo_venta WHERE v.cliente = ?`, [cliente]);
            if(resultado[0].length){
                return resultado[0];
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async pagarVenta(serial){
        try{
            const resultado = await this.peticionesDB.query("UPDATE ventas SET ventas.estado = 'Pagada' WHERE ventas.codigo = ?", [serial]);
            if(resultado[0].affectedRows > 0){
                return {respuesta: true}
            } else {
                return {respuesta:false}
            }
        } catch (error){
            console.log(error);
            return {respuesta: false}
        }
    }

    async eliminarVenta(serial){
        try{
            const resultado = await this.peticionesDB.query("UPDATE ventas SET ventas.estado = 'Anulada' WHERE ventas.codigo = ?", [serial]);
            console.log(resultado);
            if(resultado[0].affectedRows > 0){
                return {respuesta: true}
            } else {
                return {respuesta:false}
            }
        } catch (error){
            console.log(error);
            return {respuesta: false}
        }
    }

    async registrarPedido(cliente, producto, cantidad, precio, subtotal){
        try{
            const resultado = await this.peticionesDB.query("INSERT INTO pedidos (codigo_venta, cliente, codigo_producto, precio, cantidad, subtotal) VALUES (0, ?, ?, ?, ?, ?)", [cliente, producto, precio, cantidad, subtotal]);
            if(resultado[0].insertId){
                return {respuesta: true};
            } else {
                return {respuesta: false};
            }
        } catch (error){
            console.log(error);
            return {respuesta: false};
        }
    }

    async eliminarPedido(id){
        try{
            const resultado = await this.peticionesDB.query("DELETE FROM pedidos WHERE id = ?", [id]);
            if(resultado[0].affectedRows > 0){
                return {respuesta: true}
            } else {
                return {respuesta:false}
            }
        } catch(error){
            console.log(error);
            return {respuesta: false};
        }
    }

    async facturarPedido(pedido, cliente){
        try{
            const resultadoFactura = await this.peticionesDB.query("INSERT INTO ventas(cliente, fecha, pago_parcial, total, estado) VALUES (?, CURRENT_DATE, 0, 0, 'Pendiente')", [cliente]);
            if(resultadoFactura[0].insertId > 0){
                const resultado = await this.peticionesDB.query("UPDATE pedidos SET pedidos.codigo_venta = ? WHERE pedidos.id = ?", [resultadoFactura[0].insertId, pedido.id]);
                if(resultado[0].affectedRows > 0){
                    
                    const resultadoDescuento = await this.peticionesDB.query(
                        "UPDATE productos SET cantidad = cantidad - ? WHERE serial = ?",
                        [pedido.cantidad, pedido.codigo_producto]
                    );
                    
                    if (resultadoDescuento[0].affectedRows === 0) {
                        return { respuesta: false };
                    }

                    const resultadoActualizacion = await this.peticionesDB.query("UPDATE ventas SET ventas.total = ? WHERE ventas.codigo = ?", [pedido.subtotal, resultadoFactura[0].insertId]);
                    if(resultadoActualizacion[0].affectedRows > 0){
                        return {respuesta: true};
                    } else {
                        return {respuesta: false};
                    }
                } else {
                    return {respuesta:false}
                }
            } else {
                return {respuesta:false}
            }
        } catch (error){
            console.log(error);
            return {respuesta: false};
        }
    }
    async facturarCarrito(cliente, pedidos) {
        try {
            const resultadoCreacionFactura = await this.peticionesDB.query(
                "INSERT INTO ventas(cliente, fecha, pago_parcial, total, estado) VALUES (?, CURRENT_DATE, 0, 0, 'Pendiente')",
                [cliente]
            );
            
            if (resultadoCreacionFactura[0].insertId > 0) {
                const codigoVenta = resultadoCreacionFactura[0].insertId;
                let total = 0;
                
                for (let pedido of pedidos) {
                    const resultadoActualizacionPedido = await this.peticionesDB.query(
                        "UPDATE pedidos SET pedidos.codigo_venta = ? WHERE pedidos.id = ?",
                        [codigoVenta, pedido.id]
                    );
                    
                    if (resultadoActualizacionPedido[0].affectedRows === 0) {
                        return { respuesta: false };
                    }
                    
                    const resultadoDescuento = await this.peticionesDB.query(
                        "UPDATE productos SET cantidad = cantidad - ? WHERE serial = ?",
                        [pedido.cantidad, pedido.codigo_producto]
                    );
                    
                    if (resultadoDescuento[0].affectedRows === 0) {
                        return { respuesta: false };
                    }

                    total += pedido.subtotal;
                }
                
                const resultadoActualizacion = await this.peticionesDB.query(
                    "UPDATE ventas SET ventas.total = ? WHERE ventas.codigo = ?",
                    [total, codigoVenta]
                );
                
                if (resultadoActualizacion[0].affectedRows > 0) {
                    return { respuesta: true };
                } else {
                    return { respuesta: false };
                }
            } else {
                return { respuesta: false };
            }
        } catch (error) {
            console.log(error);
            return { respuesta: false };
        }
    }
    
}

module.exports = Ventas;