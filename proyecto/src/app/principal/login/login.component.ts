import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})


export class LoginComponent implements OnInit {

  correo:string="";
  contrasena:string="";

  constructor(private router: Router, private http:HttpService) {}

  ngOnInit(): void {
    if(this.http.obtenerSesion()){
      this.goToPrincipal();
    }
  }

  goToPrincipal() {
    this.router.navigate(['/']);
  }

  iniciarSesion(){
    this.http.iniciarSesion(this.correo,this.contrasena).subscribe(
      data => {
        if(data){
          if(data.respuesta){
            this.http.guardarSesion(data.usuario);
            this.goToPrincipal();
          } else {
            alert("Credenciales no validas");
            this.http.cerrarSesion();
            window.location.reload();
          }
        } else {
          this.http.cerrarSesion();
          alert("No se encontro el usuario");
        }
      },
      error => {
        console.log(error);
        alert("Error al iniciar sesion");
        this.http.cerrarSesion();
      }
    )
  }

}
