import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.scss'
})
export class RegistrarComponent {
  usuario:any;
  sesion:any;

  constructor(private router:Router, private servicioHttp:HttpService){}

  ngOnInit(): void {
    this.usuario = this.servicioHttp.obtenerUsuario();
    this.sesion = this.servicioHttp.obtenerSesion();
    if(this.usuario.cargo!="Cliente" && this.sesion){
      this.servicioHttp.obtenerMarcas().subscribe(
        datos=>{
          if(datos){
            if(datos.respuesta){
              this.marcas = datos.marcas
            } else {
              this.marcas = []
            }
          }
        }, error =>{
          console.log(error);
          this.marcas = [];
        }
      );
      this.servicioHttp.obtenerCategorias().subscribe(
        datos=>{
          if(datos){
            console.log(datos)
            if(datos.respuesta){
              this.categorias = datos.categorias
            } else {
              this.categorias = []
            }
          }
        }, error =>{
          console.log(error);
          this.categorias = [];
        }
      );
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  serial:string="";
  serial_ant:string="";
  nombre:string="";
  precio:string="";
  categoria:string="";
  marca:string="";
  cantidad:string="";
  descripcion:string=""
  imagen:string=""
  marcas:any;
  categorias:any;

  registrarProducto(){
    this.servicioHttp.registrarProducto(this.serial,this.nombre,this.precio,this.categoria,this.marca,this.descripcion,this.cantidad,this.imagen).subscribe(
      datos=>{
        if(datos){
          if(datos.respuesta){
            alert("Producto registrado");
          } else {
            alert("producto no registrado")
          }
        }
      }, error =>{
        console.log(error);
      }
    )
  }


}
