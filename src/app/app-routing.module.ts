import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Use RouterModule, Routes for activating routing in angular
import { RouterModule, Routes } from '@angular/router';

// Include components for in which router service to be used
import { AddClienteComponent } from './cadastros/cliente/add-cliente/add-cliente.component';
import { EditClienteComponent } from './cadastros/cliente/edit-cliente/edit-cliente.component';
import { ListClienteComponent } from './cadastros/cliente/list-cliente/list-cliente.component';

// Routes array define component along with the path name for url
const routes: Routes = [
  { path: '', redirectTo: '/add-student', pathMatch: 'full' },
  { path: 'add-cliente', component: AddClienteComponent },
  { path: 'list-cliente', component: ListClienteComponent },
  { path: 'edit-cliente/:id', component: EditClienteComponent }
];

// Import RouterModule and inject routes array in it and dont forget to export the RouterModule
@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }