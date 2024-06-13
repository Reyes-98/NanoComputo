import { Component, Input } from '@angular/core';
import { HttpService } from '../../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrl: './actualizar.component.scss'
})
export class ActualizarComponent {
  @Input() venta:any;
  @Input() usuarioSesion:any;

  usuario:any;
  serial:string="";
  serial_ant:string="";
  cliente:string="";
  fecha:string="";
  pagoParcial:string="";
  pedidos:any;
  total:string="";
  estado:string="";

  constructor(private router:Router, private servicioHttp:HttpService){}

  ngOnInit(): void {
    console.log(this.venta);
    this.serial = this.venta.codigo;
    this.serial_ant = this.venta.codigo_ant;
      this.cliente = this.venta.cliente_v;
    const fechaObj = new Date(this.venta.fecha);
    this.fecha = fechaObj.toISOString().split('T')[0];
    this.pagoParcial = this.venta.pago_parcial;
    this.total = this.venta.total;
    this.estado = this.venta.estado;
    this.usuario = this.usuarioSesion;
    this.servicioHttp.obtenerPedidos(this.serial, "").subscribe(
      datos=>{
        console.log(datos)
        if(datos){
          if(datos.respuesta){
            this.pedidos = datos.pedidos
          } else {
            this.pedidos = []
          }
        }
      }, error =>{
        console.log(error);
        this.pedidos = [];
      }
    )
  }

  actualizarVenta(){
    this.servicioHttp.actualizarVenta(this.serial, this.fecha, this.cliente, this.pagoParcial, this.pedidos, this.total).subscribe(
      datos=>{
        if(datos){
          if(datos.respuesta){
            alert("usuario actualizado")
          } else {
            alert("Usuario  no actualizado")
          }
        }
      }, error=>{
        console.log(error);
      }
    )
  };

  eliminarVenta(){
    this.servicioHttp.eliminarVenta(this.serial).subscribe(
      data=>{
        if(data){
          if(data.respuesta){
            alert("venta eliminada del sistema");
            window.location.reload();
          } else {
            alert("Venta no eliminado")
          }
        }
      }, error=>{
        console.log(error);
      }
    )
  }

  eliminarPedido(codigo:string){

  }

}
