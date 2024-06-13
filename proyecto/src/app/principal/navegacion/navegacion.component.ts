import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../http.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActualizarComponent } from '../../usuarios/actualizar/actualizar.component';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrl: './navegacion.component.scss'
})
export class NavegacionComponent implements OnInit {

  constructor(private router:Router, private servicionHttp:HttpService, private modales: NgbModal){}

  ngOnInit(): void {
    this.sesion = this.servicionHttp.obtenerSesion();
    this.usuario = this.servicionHttp.obtenerUsuario();
    this.servicionHttp.usuarioEspecifico(this.usuario.identificacion).subscribe(
      datos=>{
        if(datos){
          if(datos.respuesta){
            this.datosUsuario = datos.usuario;
          } else {
            this.datosUsuario =  {}
          }
        } else {
          this.datosUsuario =  {}
        }
      }, error =>{
        console.log(error);
        this.datosUsuario =  {}
      }
    )
  }

  catalogo:boolean=true;
  aboutUs:boolean=false;
  sesion:boolean=false;
  usuario:any;
  datosUsuario:any;

  cerrarSesion(){
    this.servicionHttp.cerrarSesion();
    this.router.navigate(["/dashboard"]);
  }
  listadoVentasCliente(){
    this.router.navigate(["listadoVentasCliente", this.usuario.identificacion])
  }
  carritoDeCompras(){
    this.router.navigate(["carritoDeCompras"])
  }
  perfilUsuario(){
    const ventanaModal = this.modales.open(ActualizarComponent, {size:'lg'});
    ventanaModal.componentInstance.usuarioM = this.datosUsuario;
    console.log(ventanaModal.componentInstance.usuarioM);
    ventanaModal.componentInstance.usuarioSesion = this.usuario;
  }

  obtenerInformacionUsuario(){
  }

}
