import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {DirectivaComponent} from "./directiva/directiva.component";
import {ClientesComponent} from "./clientes/clientes.component";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {FormComponent} from './clientes/form.component';
import {FormsModule} from "@angular/forms";

/*
* Configuracion global de internazionalizacion de la app para que retorne a español
* */
import localeEs from '@angular/common/locales/es';
import {registerLocaleData} from "@angular/common";
import { PaginatorComponent } from './paginator/paginator.component';
import { ObjectEmptyPipe } from './pipes/object-empty.pipe';

registerLocaleData(localeEs);

const routes: Routes = [
  {path: '', redirectTo: '/clientes', pathMatch: 'full'},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'clientes/page/:page', component: ClientesComponent},
  {path: 'clientes/form', component: FormComponent},
  {path: 'clientes/form/:id', component: FormComponent},
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
    ObjectEmptyPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    // Proveyendo a toda la app del locale español
    {provide: LOCALE_ID, useValue: 'es'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
