import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActualizarComponent } from './actualizar/actualizar.component';
import { EliminarComponent } from './eliminar/eliminar.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { VisualizarComponent } from './visualizar/visualizar.component';



@NgModule({
  declarations: [
    ActualizarComponent,
    EliminarComponent,
    RegistrarComponent,
    VisualizarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ClientesModule { }
 