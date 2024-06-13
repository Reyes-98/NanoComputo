import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { HttpService } from '../../http.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActualizarComponent as ActualizarVentaComponent } from '../actualizar/actualizar.component';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.component.html',
  styleUrl: './visualizar.component.scss'
})
export class VisualizarComponent implements OnInit {


  constructor(private router:Router, private servicioHttp:HttpService, private modales: NgbModal){}

  ventas:any;
  sesion:any;
  usuarioSesion:any;
  
  ngOnInit(): void {
    this.sesion = this.servicioHttp.obtenerSesion();
    this.usuarioSesion = this.servicioHttp.obtenerUsuario();
    if(this.sesion && this.usuarioSesion.cargo != "Cliente"){
      this.servicioHttp.obtenerVentas().subscribe(
        datos=>{
          console.log(datos)
          if(datos){
            if(datos.respuesta){
              this.ventas=datos.ventas;
            } else {
              this.ventas = [];
            }
          }
        }, error=>{
          console.log(error);
          this.ventas = []; 
        }
      )
    }
  }

  formatearCodigo(codigo: number): string {
    let numStr = codigo.toString();
    while (numStr.length < 4) {
      numStr = '0' + numStr;
    }
    return numStr;
  }

  visualizarVenta(venta:any){
    const ventanaModal = this.modales.open(ActualizarVentaComponent, {size:'lg'});
    ventanaModal.componentInstance.venta = venta;
    ventanaModal.componentInstance.usuarioSesion = this.usuarioSesion;
  }

  pagarVenta(venta:string){
    this.servicioHttp.pagarFactura(venta).subscribe(
      datos=>{
        if(datos){
          if(datos.respuesta){
            alert("Venta Pagada");
            window.location.reload();
          } else {
            alert("La venta no fue pagada");
          }
        }
      }, error =>{
        console.log(error);
        alert("Error actualizando la venta");
      }
    )
  }

  eliminarVenta(venta:string){
    this.servicioHttp.eliminarVenta(venta).subscribe(
      datos=>{
        if(datos){
          if(datos.respuesta){
            alert("Venta Anulada");
            window.location.reload();
          } else {
            alert("La venta no fue anulada");
          }
        }
      }, error =>{
        console.log(error);
        alert("Error anulando la venta");
      }
    )
  }

}
