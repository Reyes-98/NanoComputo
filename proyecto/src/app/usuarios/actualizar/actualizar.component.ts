import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrl: './actualizar.component.scss'
})
export class ActualizarComponent implements OnInit {
  
  @Input() usuarioM:any;
  @Input() usuarioSesion:any;

  usuario:any;
  
  constructor(private router:Router, private servicioHttp:HttpService){}

  ngOnInit(): void {
    this.identificacion = this.usuarioM.identificacion;
    this.identificacion_ant = this.usuarioM.identificacion;
    this.nombres = this.usuarioM.nombres;
    this.apellidos = this.usuarioM.apellidos;
    this.cargoUsuario = this.usuarioM.cargo;
    this.telefono = this.usuarioM.telefono;
    this.correo = this.usuarioM.correo;
    this.pregunta = this.usuarioM.pregunta;
    this.respuesta = this.usuarioM.respuesta;
    this.usuario = this.usuarioSesion;
    this.servicioHttp.obtenerCargos().subscribe(
      datos=>{
        if(datos){
          if(datos.respuesta){
            this.cargos = datos.cargos
          } else {
            this.cargos = []
          }
        }
      }, error =>{
        console.log(error);
        this.cargos = [];
      }
    )
  }

  identificacion:string="";
  identificacion_ant:string="";
  nombres:string="";
  apellidos:string="";
  cargoUsuario:string="";
  cargos:any;
  telefono:string="";
  correo:string="";
  pregunta:string="";
  respuesta:string="";

  actualizarUsuario(){
    this.servicioHttp.actualizarUsuario(this.identificacion, this.nombres, this.apellidos, this.telefono, this.cargoUsuario, this.correo, this.pregunta, this.respuesta, this.identificacion_ant).subscribe(
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

  eliminarUsuario(){
    this.servicioHttp.eliminarUsuario(this.identificacion).subscribe(
      data=>{
        if(data){
          if(data.respuesta){
            alert("Usuario Eliminado del sistema")
          } else {
            alert("Usuario no eliminado")
          }
        }
      }, error=>{
        console.log(error);
      }
    )
  }

}
