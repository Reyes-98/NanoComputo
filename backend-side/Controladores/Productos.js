class Productos {

    constructor(){
        this.peticionesDB = require("./baseDeDatos");
    }

    async registrarProducto( serial, nombre, precio, categoria, marca, cantidad, descripcion, imagen){
        try{
            console.log("Imagen recibida:", imagen);
            const resultadoRegistro = await this.peticionesDB.query(
                "INSERT INTO productos(serial, nombre, precio, categoria, marca, cantidad, descripcion, imagen, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'A')",
                [serial, nombre, precio, categoria, marca, cantidad, descripcion, ""]
            );
            if(resultadoRegistro[0].affectedRows){
                return {respuesta:true}
            } else {
                return {respuesta:false}
            }
        } catch(eror){
            return {respuesta:false}
        }
    };
    
    async actualizarProducto( serial, nombre, precio, categoria, marca, cantidad, descripcion, imagen, serial_Ant){
        try{
            const resultado = await this.peticionesDB.query("UPDATE productos SET serial = ?, nombre =?, precio = ?, categoria = ?, marca = ?, cantidad = ?, descripcion = ?, imagen = ? WHERE serial = ?", [serial, nombre, precio, categoria, marca, cantidad, descripcion, imagen, serial_Ant])
            console.log(serial_Ant)
            if(resultado[0].affectedRows){
                return {respuesta:true};
            } else {
                return {respuesta:false}
            }
        } catch(error){
            return {respuesta:false}
        }
    };

    async listarProductos(){
        try{
            const resultado = await this.peticionesDB.query(`SELECT productos.*, categorias.nombre AS categoria_p, marcas.nombre AS marca_p 
            FROM productos, categorias, marcas 
            WHERE productos.estado='A' AND 
            productos.categoria = categorias.id AND 
            productos.marca = marcas.id;
            `);
            if(resultado[0].length > 0){
                const productosConExpandido = resultado[0].map((producto) => ({
                    ...producto,
                    expandido: false
                }));
                console.log(productosConExpandido);
                return {
                    respuesta:true,
                    productos:productosConExpandido
                };
            } else {
                return {
                    respuesta:false,
                    productos:[]
                }
            }
        } catch(error){
            return {
                respuesta:false,
                productos:[]
            }
        }
    };
    
    async descontarProductosVendidos(serial, cantidad_vendida){
        try{
            const informacionProducto = await this.peticionesDB.query("SELECT * FROM productos where serial=?", [serial]);
            if(informacionProducto[1].cantidad > cantidad_vendida){
                const resultadoRegistro = await this.peticionesDB.query("UPDATE productos SET cantidad= cantidad - ? WHERE serial =?", [serial, cantidad_vendida]);
                if(resultadoRegistro[0].affectedRows){
                    return {respuesta:true};
                } else {
                    return {respuesta:false}
                }
            } else {
                return {respuesta:false}
            }
        } catch(error){

        }
    };

    async eliminarProducto(serial){
        try{
            const resultadoRegistro = await this.peticionesDB.query("UPDATE productos SET estado='I' WHERE serial=?", [serial]);
            if(resultadoRegistro[0].affectedRows){
                return {respuesta:true};
            } else {
                return {respuesta:false}
            }

        } catch(error){
            return {respuesta:false}
        }
                    
    }

    async obtenerCategorias(){
        try{
            const resultado = await this.peticionesDB.query("SELECT * FROM categorias")
            if(resultado[0].length > 0){
                return {
                    respuesta:true,
                    categorias:resultado[0]
                }
            } else {
                return {
                    respuesta:false,
                    categorias:{}
                }
            }
        } catch(error){
            console.log(error);
            return {
                respuesta:false,
                categorias:{}
            }
        }
    }

    async obtenerMarcas(){
        try{
            const resultado = await this.peticionesDB.query("SELECT * FROM marcas")
            if(resultado[0].length > 0){
                return {
                    respuesta:true,
                    marcas:resultado[0]
                }
            } else {
                return {
                    respuesta:false,
                    marcas:{}
                }
            }
        } catch(error){
            console.log(error);
            return {
                respuesta:false,
                marcas:{}
            }
        }
    }


};

module.exports=Productos;