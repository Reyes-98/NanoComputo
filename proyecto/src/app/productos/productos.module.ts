import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActualizarComponent as ActualizarProductoComponent } from './actualizar/actualizar.component';
import { EliminarComponent as EliminarProductoComponent } from './eliminar/eliminar.component';
import { RegistrarComponent as RegistrarProductoComponent } from './registrar/registrar.component';
import { VisualizarComponent as VisualizarProductosComponent } from './visualizar/visualizar.component';
import { PrincipalModule } from '../principal/principal.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ActualizarProductoComponent,
    EliminarProductoComponent,
    RegistrarProductoComponent,
    VisualizarProductosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrincipalModule
  ], 
  exports:[
    ActualizarProductoComponent,
    EliminarProductoComponent,
    RegistrarProductoComponent,
    VisualizarProductosComponent
  ]
})
export class ProductosModule { }
