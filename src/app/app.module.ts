import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {DirectivaComponent} from "./directiva/directiva.component";
import {ClientesComponent} from "./clientes/clientes.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {FormComponent} from './clientes/form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

/*
* Configuracion global de internazionalizacion de la app para que retorne a español
* */
import localeEs from '@angular/common/locales/es';
import {registerLocaleData} from "@angular/common";
import {PaginatorComponent} from './paginator/paginator.component';
import {ObjectEmptyPipe} from './pipes/object-empty.pipe';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatNativeDateModule} from "@angular/material/core";
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import {DetalleComponent} from './clientes/detalle/detalle.component';

import {MAT_DATE_LOCALE} from '@angular/material/core';
import {LoginComponent} from './usuarios/login.component'
import {AuthGuard} from "./usuarios/guards/auth.guard";
import {RoleGuard} from "./usuarios/guards/role.guard";
import {TokenInterceptor} from "./usuarios/interceptors/token.interceptor";
import {AuthResponsesInterceptor} from "./usuarios/interceptors/auth-responses.interceptor";
import { DetalleFacturaComponent } from './facturas/detalle-factura.component';
import { FacturasComponent } from './facturas/facturas.component';


registerLocaleData(localeEs);

let routes: Routes;
routes = [
  {path: '', redirectTo: '/clientes', pathMatch: 'full'},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'clientes/page/:page', component: ClientesComponent},
  {
    path: 'clientes/form', component: FormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {role: 'ROLE_ADMIN'}
  },
  {
    path: 'clientes/form/:id', component: FormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {role: 'ROLE_ADMIN'}
  },
  {path: 'clientes/ver/:id', component: DetalleComponent},
  {path: 'login', component: LoginComponent},
  {path: 'facturas/:id',
    component: DetalleFacturaComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {role: 'ROLE_USER'}
  },
  {path: 'facturas/form/:clienteId',
    component: FacturasComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {role: 'ROLE_ADMIN'}
  },
  {path: "**", redirectTo: '/clientes', pathMatch: 'full'}
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent,
    PaginatorComponent,
    ObjectEmptyPipe,
    DetalleComponent,
    LoginComponent,
    DetalleFacturaComponent,
    FacturasComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatInputModule,
    MatNativeDateModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
  ],
  providers: [
    // Proveyendo a toda la app del locale español
    {provide: LOCALE_ID, useValue: 'es'},
    // Configuracion de formato para date picker material
    {provide: MAT_DATE_LOCALE, useValue: 'es-CO'},
    // Interceptor del token
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    // Inrteceptor de errores por autenticacion o roles
    {provide: HTTP_INTERCEPTORS, useClass: AuthResponsesInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
