import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { NavegacionComponent } from './navegacion/navegacion.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { TratamientoDatosComponent } from './tratamiento-datos/tratamiento-datos.component';
import { CarritoComponent } from './carrito/carrito.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';



@NgModule({
  declarations: [
    PaginaPrincipalComponent,
    LoginComponent,
    NavegacionComponent,
    AboutUsComponent,
    TratamientoDatosComponent,
    CarritoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ModalModule.forRoot()
  ],
  exports: [
    LoginComponent,
    PaginaPrincipalComponent,
    NavegacionComponent,
    AboutUsComponent,
    TratamientoDatosComponent,
    CarritoComponent
  ]
})
export class PrincipalModule { }
