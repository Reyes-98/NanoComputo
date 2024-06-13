import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrl: './actualizar.component.scss'
})
export class ActualizarComponent {
      
  @Input() productoM:any;
  @Input() usuarioSesion:any;

  usuario:any;
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
  
  constructor(private router:Router, private servicioHttp:HttpService){}

  ngOnInit(): void {
    this.serial = this.productoM.serial;
    this.serial_ant = this.serial;
    this.nombre = this.productoM.nombre;
    this.categoria = this.productoM.categoria;
    this.marca = this.productoM.marca;
    this.descripcion = this.productoM.descripcion;
    this.cantidad = this.productoM.cantidad;
    this.precio = this.productoM.precio;
    this.usuario = this.usuarioSesion;
    this.servicioHttp.obtenerMarcas().subscribe(
      datos=>{
        if(datos){
          if(datos.respuesta){
            console.log("Asignando marcas")
            this.marcas = datos.marcas
            console.log(this.marcas)
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
          if(datos.respuesta){
            console.log("Asignando categorias")
            this.categorias = datos.categorias
            console.log(this.categorias)
          } else {
            this.categorias = []
          }
        }
      }, error =>{
        console.log(error);
        this.categorias = [];
      }
    )
  }

  actualizarUsuario(){
    console.log(this.serial, this.nombre, this.precio,  this.categoria, this.marca, this.cantidad, this.descripcion, this.imagen, this.serial_ant);
    this.servicioHttp.actualizarProducto(this.serial, this.nombre, this.precio,  this.categoria, this.marca, this.cantidad, this.descripcion, this.imagen, this.serial_ant).subscribe(
      datos=>{
        if(datos){
          if(datos.respuesta){
            alert("producto actualizado")
          } else {
            alert("producto  no actualizado")
          }
        }
      }, error=>{
        console.log(error);
      }
    )
  };

  eliminarProducto(){
    this.servicioHttp.eliminarProducto(this.serial).subscribe(
      data=>{
        if(data){
          if(data.respuesta){
            alert("Producto Eliminado del sistema")
          } else {
            alert("Producto no eliminado")
          }
        }
      }, error=>{
        console.log(error);
      }
    )
  }

  openCatalogo(){}

  openAboutUs(){}

  goToLogin(){}


  
}
