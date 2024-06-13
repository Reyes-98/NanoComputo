import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }

  private link:string = "http://localhost:3000";

  obtenerInventario(){
    return this.http.post<any>(`${this.link}/listadoProductos`, {})
  };

  iniciarSesion(correo:string, contrasena:string){
    return this.http.post<any>(`${this.link}/iniciarSesion`, {correo, contrasena})
  };

  guardarSesion(usuario:any){
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('sesion', 'true');
  };

  cerrarSesion(){
    localStorage.setItem('usuario', '');
    localStorage.setItem('sesion', 'false');
  };

  obtenerSesion(): boolean {
    return localStorage.getItem('sesion') === 'true';
  };

  obtenerUsuario(): any {
    const usuarioStorage = localStorage.getItem('usuario');
    if(usuarioStorage){
      return usuarioStorage ? JSON.parse(usuarioStorage) : {cargo:"Trabajador"};
    } else {
      return {cargo:"Trabajador"}
    }
  };

  registrarUsuario(identificacion:string,nombres:string,apellidos:string,telefono:string, cargo:string,correo:string,contrasena:string,pregunta:string, respuesta:string){
    return this.http.post<any>(`${this.link}/registrarUsuario`, {identificacion,nombres,apellidos,telefono,cargo,correo,contrasena,pregunta,respuesta})
  };

  obtenerUsuariosRegistrados(){
    return this.http.post<any>(`${this.link}/listarUsuarios`, {})
  }

  actualizarUsuario(identificacion:string,nombres:string,apellidos:string,telefono:string, cargo:string,correo:string,pregunta:string, respuesta:string, identificacion_ant:string){
    return this.http.post<any>(`${this.link}/actualizarUsuario`, {identificacion, nombres, apellidos, telefono, cargo, correo, pregunta, respuesta, identificacion_ant})
  }

  eliminarUsuario(identificacion:string){
    return this.http.post<any>(`${this.link}/eliminarUsuario`, {identificacion});
  }

  usuarioEspecifico(identificacion:string){
    return this.http.post<any>(`${this.link}/usuarioEspecifico`, {identificacion});
  }

  obtenerCargos(){
    return this.http.post<any>(`${this.link}/listaCargos`, {})
  }

  obtenerProductos(){
    return this.http.post<any>(`${this.link}/listadoProductos`, {})
  }

  actualizarProducto(serial:string, nombre:string, precio:string, categoria:string, marca:string, cantidad:string, descripcion:string, imagen:string, serial_ant:string){
    return this.http.post<any>(`${this.link}/actualizarProducto`, {serial,nombre,precio, categoria, marca, cantidad, descripcion, imagen, serial_ant})
  }

  obtenerCategorias(){
    return this.http.post<any>(`${this.link}/obtenerCategorias`, {})
  }

  obtenerMarcas(){
    return this.http.post<any>(`${this.link}/obtenerMarcas`, {})
  }

  eliminarProducto(serial:string){
    return this.http.post<any>(`${this.link}/eliminarProducto`, {serial})
  }

  registrarProducto(serial:string, nombre:string, precio:string, categoria:string, marca:string, descripcion:string, cantidad:string, imagen:any){
    console.log(imagen);
    return this.http.post<any>(`${this.link}/registrarProducto`, {serial,nombre,precio, categoria, marca, cantidad, descripcion, imagen})
  }

  obtenerVentas(){
    return this.http.post<any>(`${this.link}/obtenerListaVentas`, {})
  }

  obtenerVentasCliente(cliente:string){
    return this.http.get<any>(`${this.link}/obtenerListaVentas/${cliente}`)
  }

  obtenerPedidos(serial:string, cliente:string){
    return this.http.post<any>(`${this.link}/obtenerListaPedidos`, {serial, cliente})
  }

  actualizarVenta(codigo:string, fecha:string, cliente:string, pago_parcial:string, pedidos:any, total:string){
    return this.http.post<any>(`${this.link}/actualizarVenta`, {codigo, fecha, cliente, pago_parcial, total, pedidos});
  }

  pagarFactura(serial:string){
    return this.http.post<any>(`${this.link}/pagarVenta`, {serial});
  }

  eliminarVenta(serial:string){
    return this.http.post<any>(`${this.link}/eliminarVenta`, {serial});
  }

  anadirPedidoCarrito(cliente:string, producto:string, precio:number, cantidad:number){
    const subtotal = precio*cantidad;
    return this.http.post<any>(`${this.link}/registrarPedido`, {cliente, producto, precio, cantidad, subtotal});
  }

  eliminarPedidoCarrito(id:string){
    return this.http.post<any>(`${this.link}/eliminarPedido`, {id});
  }

  facturarPedido(cliente:string, pedido:any){
    return this.http.post<any>(`${this.link}/facturarPedido`, {cliente, pedido});
  }

  facturarCarrito(cliente:string, pedidos:any){
    return this.http.post<any>(`${this.link}/facturarCarrito`, {cliente, pedidos});
  }

  actualizarPedido(pedido:string, cantidad:any){
    return this.http.post<any>(`${this.link}/actualizarPedido`, {pedido, cantidad});
  }

}
