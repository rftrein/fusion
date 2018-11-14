import { Injectable } from '@angular/core';
import { Cliente } from '../shared/cliente';  
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  

@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  clientesRef: AngularFireList<any>;    // Reference to Cliente data list, its an Observable
  clienteRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  AddCliente(cliente: Cliente) {
    this.clientesRef.push({
      nome: cliente.nome,
      documento: cliente.documento,
      cpfCnpj: cliente.cpfCnpj,
      email: cliente.email,
      celular: cliente.celular,
      telefone: cliente.telefone
    })
  }

  // Fetch Single Cliente Object
  GetCliente(id: string) {
    this.clienteRef = this.db.object('cliente-list/' + id);
    return this.clienteRef;
  }

  // Fetch Students List
  GetClienteList() {
    this.clientesRef = this.db.list('cliente-list');
    return this.clientesRef;
  }  

  // Update Cliente Object
  UpdateCliente(cliente: Cliente) {
    this.clienteRef.update({
      nome: cliente.nome,
      documento: cliente.documento,
      cpfCnpj: cliente.cpfCnpj,
      email: cliente.email,
      celular: cliente.celular,
      telefone: cliente.telefone
    })
  }  

  // Delete Cliente Object
  DeleteCliente(id: string) { 
    this.clienteRef = this.db.object('cliente-list/'+id);
    this.clienteRef.remove();
  }
}
