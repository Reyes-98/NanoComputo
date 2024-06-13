import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaPrincipalComponent } from './principal/pagina-principal/pagina-principal.component';
import { LoginComponent } from './principal/login/login.component';
import { RegistrarComponent as RegistrarUsuarioComponent } from './usuarios/registrar/registrar.component';
import { RegistrarComponent as RegistrarProductoComponent } from './productos/registrar/registrar.component';
import { VisualizarComponent as VisualizarProductoComponent } from './productos/visualizar/visualizar.component';
import { VisualizarComponent as VisualizarUsuarioComponent} from './usuarios/visualizar/visualizar.component';
import { VisualizarComponent as VisualizarVentasComponent } from './facturas/visualizar/visualizar.component';
import { VisualizarClienteComponent as VisualizarVentasClienteComponent } from './facturas/visualizar-cliente/visualizar-cliente.component';
import { AboutUsComponent } from './principal/about-us/about-us.component';
import { TratamientoDatosComponent } from './principal/tratamiento-datos/tratamiento-datos.component';
import { CarritoComponent } from './principal/carrito/carrito.component';


const routes: Routes = [
  {path: 'dashboard', component: PaginaPrincipalComponent},
  {path: '', component: PaginaPrincipalComponent},
  {path: 'registroUsuario', component: RegistrarUsuarioComponent},
  {path: 'login', component: LoginComponent},
  {path: 'listadoUsuarios', component:VisualizarUsuarioComponent},
  {path: 'registroProducto', component:RegistrarProductoComponent},
  {path: 'listadoProductos', component:VisualizarProductoComponent},
  {path: 'listadoVentas', component:VisualizarVentasComponent},
  {path: 'sobreNosotros', component: AboutUsComponent},
  {path: 'tratamientoDatos', component: TratamientoDatosComponent},
  {path: 'listadoVentasCliente/:cliente', component: VisualizarVentasClienteComponent},
  {path: 'carritoDeCompras', component: CarritoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
