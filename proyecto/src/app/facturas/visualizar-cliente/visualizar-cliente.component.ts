import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActualizarComponent as ActualizarVentaComponent } from '../actualizar/actualizar.component';

@Component({
  selector: 'app-visualizar-cliente',
  templateUrl: './visualizar-cliente.component.html',
  styleUrl: './visualizar-cliente.component.scss'
})
export class VisualizarClienteComponent implements OnInit {


  constructor(private router:Router, private servicioHttp:HttpService, private ruta:ActivatedRoute, private modales: NgbModal){}

  ventas:any;
  sesion:any;
  usuarioSesion:any;
  id:any;
  
  ngOnInit(): void {
    this.sesion = this.servicioHttp.obtenerSesion();
    this.usuarioSesion = this.servicioHttp.obtenerUsuario();
    
    this.ruta.paramMap.subscribe(params => {
      this.id = params.get('cliente');
    });
    if(this.sesion && this.usuarioSesion.cargo == "Cliente" && this.id){
      this.servicioHttp.obtenerVentasCliente(this.id).subscribe(
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

}