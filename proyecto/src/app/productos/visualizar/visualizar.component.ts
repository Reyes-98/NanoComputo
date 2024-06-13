import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActualizarComponent } from '../actualizar/actualizar.component';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.component.html',
  styleUrl: './visualizar.component.scss'
})
export class VisualizarComponent implements OnInit {

  constructor(private router:Router, private servicioHttp:HttpService, private modales: NgbModal){}

  productos:any;
  sesion:any;
  usuarioSesion:any;

  ngOnInit(): void {
    this.sesion = this.servicioHttp.obtenerSesion();
    this.usuarioSesion = this.servicioHttp.obtenerUsuario();
    if(this.sesion && this.usuarioSesion.cargo != "Cliente"){
      console.log(this.usuarioSesion)
      this.servicioHttp.obtenerProductos().subscribe(
        datos=>{
          console.log(datos)
          if(datos){
            if(datos.respuesta){
              this.productos=datos.productos;
            } else {
              this.productos = [];
            }
          }
        }, error=>{
          console.log(error);
          this.productos = []; 
        }
      )
    } else {
      this.router.navigate(['/login']);
    }
    
  }

  visualizarProducto(producto:any){
      const ventanaModal = this.modales.open(ActualizarComponent, {size:'lg'});
      ventanaModal.componentInstance.productoM = producto;
      ventanaModal.componentInstance.usuarioSesion = this.usuarioSesion;
  }

}
