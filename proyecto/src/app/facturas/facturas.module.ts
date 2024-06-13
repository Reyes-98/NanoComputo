import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActualizarComponent as ActualizarFacturaComponent } from './actualizar/actualizar.component';
import { EliminarComponent as EliminarFacturaComponent } from './eliminar/eliminar.component';
import { RegistrarComponent as RegistrarFacturaComponent } from './registrar/registrar.component';
import { VisualizarComponent as VisualizarFacturaComponent } from './visualizar/visualizar.component';
import { FormsModule } from '@angular/forms';
import { PrincipalModule } from '../principal/principal.module';
import { VisualizarClienteComponent } from './visualizar-cliente/visualizar-cliente.component';



@NgModule({
  declarations: [
    ActualizarFacturaComponent,
    EliminarFacturaComponent,
    RegistrarFacturaComponent,
    VisualizarFacturaComponent,
    VisualizarClienteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrincipalModule
  ], 
  exports: [
    ActualizarFacturaComponent,
    RegistrarFacturaComponent,
    VisualizarFacturaComponent,
    VisualizarClienteComponent
  ]
})
export class FacturasModule { }
