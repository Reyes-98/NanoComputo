class Usuarios {

    constructor(){
        this.peticionesDB = require("./baseDeDatos");
    }

    async registrarUsuario(identificacion, nombres, apellidos, cargo, telefono, correo, pregunta, respuesta, contrasena){
        try{
            const resultadoRegistro = await this.peticionesDB.query("INSERT INTO usuarios(identificacion, nombres, apellidos, cargo, telefono, correo, contrasena, pregunta, respuesta, estado) VALUES (?,?,?,?,?,?,?,?,?,'A')", [identificacion, nombres, apellidos, cargo, telefono, correo, contrasena, pregunta, respuesta]);
            console.log(resultadoRegistro[0]);
            if(resultadoRegistro[0].affectedRows > 0){
                return {respuesta:true}
            } else {
                return {respuesta:false}
            }
        }catch(error){
            console.log(error);
            return {respuesta:false}
        }
    }
    
    async actualizarUsuario(identificacion, nombres, apellidos, cargo, telefono, correo, pregunta, respuesta, identificacion_ant){
        try{
            const resultadoActualizacion = await this.peticionesDB.query("UPDATE usuarios SET identificacion=?, nombres=?, apellidos=?, cargo=?, telefono=?, correo=?, pregunta=?, respuesta=? WHERE identificacion=?", [identificacion, nombres, apellidos, cargo, telefono, correo, pregunta, respuesta, identificacion_ant]);
            console.log(resultadoActualizacion)
            if(resultadoActualizacion[0].affectedRows > 0){
                return {respuesta:true}
            } else {
                return {respuesta:false}
            }
        }catch(error){
            console.log(error);
            return {respuesta:false}
        }
    }

    async listarUsuarios(){
        try{
            const listaUsuarios = await this.peticionesDB.query("SELECT * FROM usuarios, cargos WHERE usuarios.estado = 'A' AND usuarios.cargo = cargos.id");
            console.log(listaUsuarios);
            if(listaUsuarios[1].length > 0){
                return {
                    respuesta:true,
                    usuarios:listaUsuarios[0]
                }
            } else {
                return {
                    respuesta:false,
                    usuarios:[]
                }
            }
        } catch(error){
            console.log(error);
            return {
                respuesta:false,
                usuarios:[]
            }
        }
    }

    async inhabilitarUsuario(identificacion){
        try{
            const resultado = await this.peticionesDB.query("UPDATE usuarios SET estado='I' WHERE identificacion=?", [identificacion]);
            if(resultado[0].affectedRows > 0){
                return {respuesta:true}
            } else {
                return {respuesta:false}
            }
        } catch(error){
            console.log(error);
            return {respuesta:false}
        }
    }

    async usuarioEspecifico(identificacion){
        try{
            const resultado = await this.peticionesDB.query("SELECT * FROM usuarios WHERE usuarios.identificacion = ?", [identificacion]);
            if(resultado[0].length > 0){
                return {respuesta:true, usuario:resultado[0][0]}
            } else {
                return {respuesta:false, usuario:{}}
            }
        } catch(error){
            console.log(error);
            return {respuesta:false, usuario:{}}
        }
    }

    async iniciarSesion(correo, pass){
        try{
            const resultado = await this.peticionesDB.query("SELECT usuarios.identificacion, usuarios.nombres, usuarios.apellidos, cargos.nombre as cargo FROM usuarios, cargos WHERE cargos.id = usuarios.cargo AND usuarios.correo = ? AND usuarios.contrasena = ?", [correo, pass]);
            if(resultado[0].length > 0){
                return {respuesta:true, usuario:resultado[0][0]}
            } else {
                return {respuesta:false, usuario:{}}
            }
        } catch (error){
            console.log(error);
        }
    }

    async listaCargos(){
        try{
            const resultado = await this.peticionesDB.query("SELECT * FROM cargos");
            if(resultado.length > 0){
                return {respuesta:true, cargos:resultado[0]}
            } else {
                return {respuesta:false, cargos:[]}
            }
        } catch(error){
            console.log(error);
            return {respuesta:false, cargos:[]}
        }
    }
}

module.exports = Usuarios;