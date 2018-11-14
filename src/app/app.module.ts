import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination';

import { AddClienteComponent } from './cadastros/cliente/add-cliente/add-cliente.component';
import { EditClienteComponent } from './cadastros/cliente/edit-cliente/edit-cliente.component';
import { ListClienteComponent } from './cadastros/cliente/list-cliente/list-cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    AddClienteComponent,
    EditClienteComponent,
    ListClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), 
    AngularFireDatabaseModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    NgxPaginationModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
