import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../http.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrl: './pagina-principal.component.scss'
})
export class PaginaPrincipalComponent implements OnInit{
  catalogo=false
  aboutUs=false
  inventario = [{categoria_p:"", nombre:"", marca_p:"", cantidad:0, imagen:"", expandido:false, precio:0}];
  usuario:any;
  sesion:boolean=false;
  cantidad:number=0;
  modalRef: BsModalRef | null = null;
  filtroCategoria: string = '';
  filtroNombre: string = '';
  filtroMarca: string = '';

  constructor(private router: Router, private serviciohttp:HttpService, private modalService: BsModalService) {}

  ngOnInit(): void {
    this.sesion = this.serviciohttp.obtenerSesion();
    this.usuario = this.serviciohttp.obtenerUsuario();
    if(this.usuario.cargo == "Administrador"){
      this.router.navigate(["/listadoVentas"])
    }
    this.serviciohttp.obtenerInventario().subscribe(
      datos => {
        if(datos.respuesta){
          this.inventario=this.obtenerFilas(datos.productos);
        } else {
          this.inventario=[]
        }
      },
      error => {
        console.log(error);
        this.inventario=[]
      }
    );
  }

  obtenerFilas(productos:any) {
    const filas = [];
    for (let i = 0; i < productos.length; i += 3) {
      filas.push(productos.slice(i, i + 3));
    }
    console.log(filas)
    return filas;
  }

  mostrarProducto(producto:any){
    producto.expandido = !producto.expandido;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  anadir(producto:any, cantidad:number){
    this.serviciohttp.anadirPedidoCarrito(this.usuario.identificacion, producto.serial, producto.precio, cantidad).subscribe(
      datos => {
        if(datos){
          if(datos.respuesta){
            alert("Pedido añadido al carrito de compras")
          } else {
            alert("No se pudo agregar el pedido al carrito de compras")
          }
        } else {
          alert("Error al agregar el pedido al carrito de compras")
        }
      }
    )
  }

  get productosFiltrados() {
    return this.inventario.flat().filter(producto => {
      return (
        (!this.filtroCategoria ||  producto.categoria_p.toLowerCase().includes(this.filtroCategoria.toLowerCase())) &&
        (!this.filtroNombre || producto.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())) &&
        (!this.filtroMarca || producto.marca_p.toLowerCase().includes(this.filtroMarca.toLowerCase()))
      );
    });
  }


}
