import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { Router } from '@angular/router';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.scss'
})
export class CarritoComponent implements OnInit {

  usuario:any;
  sesion:boolean=false;
  pedidos=[{cantidad:0, id:"", imagen:"", producto_v:"", precio:0, producto:""}];
  cantidades: { [key: number]: number } = {};
  productos:any;

  constructor(private servicioHttp:HttpService, private router:Router){}

  ngOnInit(): void {
    this.usuario = this.servicioHttp.obtenerUsuario();
    this.sesion = this.servicioHttp.obtenerSesion();
    this.servicioHttp.obtenerPedidos("", this.usuario.identificacion).subscribe(
      datos=>{
        if(datos){
          if(datos.respuesta){
            this.pedidos = datos.pedidos
            this.pedidos.forEach(pedido => {
              const idPedido = parseInt(pedido.id);
              this.cantidades[idPedido] = pedido.cantidad;
            });
          } else {
            this.pedidos = []
          }
        } else {
          this.pedidos = []
        }
      }, error=>{
        console.log(error)
        this.pedidos=[];
      }
    )
    this.servicioHttp.obtenerProductos().subscribe(
      datos=>{
        if(datos){
          if(datos.respuesta){
            this.productos = datos.productos
          } else {
            this.productos = []
          }
        } else {
          this.productos = []
        }
      }, error =>{
        console.log(error)
        this.productos = []
      }
    )

  }

  actualizar(pedido:any, producto:any) {
    this.servicioHttp.actualizarPedido(pedido, this.cantidades[pedido]).subscribe(
      datos=>{
        if(datos){
          if(datos.respuesta){
            alert("Pedido Actualizado")
            window.location.reload()
          } else {
            alert("No fue posible actualizar el pedido")
          }
        } else {
          alert("Error al actualizar el pedido")
        }
      }, error =>{
        console.log(error)
        alert("Error de ejecución")
      })
  }

  eliminar(id:string) {
    this.servicioHttp.eliminarPedidoCarrito(id).subscribe(
      datos=>{
        if(datos){
          if(datos.respuesta){
            alert("Pedido eliminado del carrito");
            window.location.reload();
          } else {
            alert("No se pudo eliminar el pedido del carrito");
          }
        } else {
          alert("Error al eliminar el pedido del carrito");
        }
      }
    )
  }

  pagarPedido(id:string, pedido:any){
    this.servicioHttp.facturarPedido(id, pedido).subscribe(
      datos=>{
        if(datos){
          if(datos.respuesta){
            alert("Pedido facturado con éxito");
            window.location.reload();
          } else {
            alert("No se pudo facturar el pedido");
          }
        }
      }, error => {
        console.log(error);
        alert("Error al facturar el pedido")
      }
    )
  }

  facturarCarrito(cliente:string, pedidos:any){
    this.servicioHttp.facturarCarrito(cliente, pedidos).subscribe(
      datos=>{
        if(datos){
          if(datos.respuesta){
            alert("Carrito facturado con éxito");
            window.location.reload();
          } else {
            alert("No se pudo facturar el carrito");
          }
        }
      }, error=>{
        console.log(error);
        alert("Error al facturar el carrito")
      }
    )
  }

  ParseInt(cadena:string){
    return parseInt(cadena);
  }

}
