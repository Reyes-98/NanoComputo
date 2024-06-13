import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.scss'
})
export class CarritoComponent implements OnInit {

  usuario:any;
  sesion:boolean=false;
  pedidos:any;
  cantidad:string="";

  constructor(private servicioHttp:HttpService, private router:Router){}

  ngOnInit(): void {
    this.usuario = this.servicioHttp.obtenerUsuario();
    this.sesion = this.servicioHttp.obtenerSesion();
    this.servicioHttp.obtenerPedidos("", this.usuario.identificacion).subscribe(
      datos=>{
        if(datos){
          if(datos.respuesta){
            this.pedidos = datos.pedidos
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
  }

  actualizar() {
    // Implementa la lógica para actualizar la cantidad del producto en el carrito
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
            alert("Pedido pagado con éxito");
            window.location.reload();
          } else {
            alert("No se pudo pagar el pedido");
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

}