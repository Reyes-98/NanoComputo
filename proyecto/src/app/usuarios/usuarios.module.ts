import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActualizarComponent as ActualizarUsuarioComponent } from './actualizar/actualizar.component';
import { EliminarComponent as EliminarUsuarioComponent } from './eliminar/eliminar.component';
import { RegistrarComponent as RegistrarUsuarioComponent } from './registrar/registrar.component';
import { VisualizarComponent as VisualizarUsuarioComponent } from './visualizar/visualizar.component';
import { FormsModule } from '@angular/forms';
import { PrincipalModule } from "../principal/principal.module";



@NgModule({
    declarations: [
        ActualizarUsuarioComponent,
        EliminarUsuarioComponent,
        RegistrarUsuarioComponent,
        VisualizarUsuarioComponent
    ],
    exports: [
        ActualizarUsuarioComponent,
        EliminarUsuarioComponent,
        RegistrarUsuarioComponent,
        VisualizarUsuarioComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        PrincipalModule
    ]
})
export class UsuariosModule { }
