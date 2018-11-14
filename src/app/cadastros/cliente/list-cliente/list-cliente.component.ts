import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../service/cliente-service';    
import { Cliente } from '../../../shared/cliente';   // Student interface class for Data types.
import { ToastrService } from 'ngx-toastr';      // Alert message using NGX toastr


@Component({
  selector: 'app-cliente-list',
  templateUrl: './list-cliente.component.html',
  styleUrls: ['./list-cliente.component.css']
})

export class ListClienteComponent implements OnInit {
  p: number = 1;                      // Settup up pagination variable
  Cliente: Cliente[];                 // Save students data in Student's array.
  hideWhenNoCliente: boolean = false; // Hide students data table when no student.
  noData: boolean = false;            // Showing No Student Message, when no student in database.
  preLoader: boolean = true;          // Showing Preloader to show user data is coming for you from thre server(A tiny UX Shit)
  

  constructor(
    public crudApi: ClienteService, // Inject student CRUD services in constructor.
    public toastr: ToastrService // Toastr service for alert message
    ){ }


  ngOnInit() {
    this.dataState(); // Initialize student's list, when component is ready
    let s = this.crudApi.GetClienteList(); 
    s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.Cliente = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a['$key'] = item.key;
        this.Cliente.push(a as Cliente);
      })
    })
  }

  // Using valueChanges() method to fetch simple list of students data. It updates the state of hideWhenNoStudent, noData & preLoader variables when any changes occurs in student data list in real-time.
  dataState() {     
    this.crudApi.GetClienteList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if(data.length <= 0){
        this.hideWhenNoCliente = false;
        this.noData = true;
      } else {
        this.hideWhenNoCliente = true;
        this.noData = false;
      }
    })
  }

  // Method to delete student object
  deleteCliente(cliente) {
    if (window.confirm('Tem certeza que quer deletar esse Cliente?')) { // Asking from user before Deleting student data.
      this.crudApi.DeleteCliente(cliente.$key) // Using Delete student API to delete student.
      this.toastr.success(cliente.nome + ' deletado com sucesso!'); // Alert message will show up when student successfully deleted.
    }
  }

}