import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../http.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActualizarComponent } from '../actualizar/actualizar.component';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.component.html',
  styleUrl: './visualizar.component.scss'
})
export class VisualizarComponent implements OnInit {

  constructor(private router:Router, private servicioHttp:HttpService, private modales: NgbModal) {}

  
  sesion:any;
  usuario:any;
  usuarios:any;

  identificacion:string="";
  nombres:string="";
  apellidos:string="";
  cargo:string="";
  telefono:string="";
  pregunta:string="";
  respuesta:string="";

  ngOnInit(): void {
      this.sesion = this.servicioHttp.obtenerSesion();
      this.usuario = this.servicioHttp.obtenerUsuario();
      if(!this.sesion || this.usuario.cargo == "Cliente"){
        this.router.navigate(["login"]);
      } else {
      this.servicioHttp.obtenerUsuariosRegistrados().subscribe(
        datos=>{
          if(datos){
            if(datos.respuesta){
              this.usuarios = datos.usuarios
            } else {
              this.usuarios = []
            }
          }
        }, error =>{
          console.log(error);
          this.usuarios = []
        }
      )
    }
  }

  visualizarCliente(usuario:any){
    const ventanaModal = this.modales.open(ActualizarComponent, {size:'lg'});
    ventanaModal.componentInstance.usuarioM = usuario;
    ventanaModal.componentInstance.usuarioSesion = this.usuario;
  }



}
