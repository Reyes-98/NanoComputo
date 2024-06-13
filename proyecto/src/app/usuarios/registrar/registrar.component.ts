import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.scss'
})
export class RegistrarComponent implements OnInit {
  
  constructor(private router:Router, private servicioHttp:HttpService){}

  identificacion:string="";
  nombres:string="";
  apellidos:string="";
  telefono:string="";
  correo:string="";
  contrasena:string="";
  pregunta:string="";
  respuesta:string="";
  cargo:string="1";
  sesion:any;
  usuario:any;
  cargos:any;
  aboutUs:boolean=false;

  ngOnInit(): void {
      this.sesion = this.servicioHttp.obtenerSesion();
      this.usuario = this.servicioHttp.obtenerUsuario();
      console.log(this.usuario.cargo);
      if(this.usuario.cargo == "Cliente"){
        this.router.navigate(["dashboard"])
      } else {  
        this.servicioHttp.obtenerCargos().subscribe(
          datos=>{
            if(datos){
              if(datos.respuesta){
                this.cargos = datos.cargos;
              } else {
                this.cargos = [];
              }
            } else {
              this.cargos = [];
            }
          }, error => {
            console.log(error);
            this.cargos=[];
          }
        );
      }
  };

  registrarUsuario(){
    this.servicioHttp.registrarUsuario(this.identificacion,this.nombres,this.apellidos,this.telefono,this.cargo,this.correo,this.contrasena,this.pregunta, this.respuesta).subscribe(
      datos=>{
        if(datos){
          if(datos.respuesta){
            alert("Usuario registrado");
            this.router.navigate([''])
          } else {
            alert("No se registro el usuario")
          }
        }
      }, 
      error =>{
        console.log(error);
      }
    )
  };

  goToLogin(){
    this.router.navigate(['login'])
  }

  openCatalogo(){
    this.router.navigate(['dashboard'])
  }

  openAboutUs(){

  }
  
}
