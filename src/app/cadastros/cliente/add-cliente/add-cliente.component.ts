import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../service/cliente-service';    
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'; 
import {ActivatedRoute,Router} from "@angular/router"; 


@Component({
  selector: 'app-add-cliente',
  templateUrl: './add-cliente.component.html',
  styleUrls: ['./add-cliente.component.css']
})

export class AddClienteComponent implements OnInit {
  public clienteForm: FormGroup; 
 
  constructor(
    public crudApi: ClienteService, 
    public fb: FormBuilder,       
    public toastr: ToastrService,
    private router: Router
    ) { }

 
  ngOnInit() {
    this.crudApi.GetClienteList();
    this.clientForm();            
  }

  // Reactive student form
  clientForm() {
    this.clienteForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(5)]],
      documento: [''],
      cpfCnpj: [''],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      celular: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      telefone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })  
  }

  // Accessing form control using getters
  get nome() {
    return this.clienteForm.get('nome');
  }

  get documento() {
    return this.clienteForm.get('documento');
  }  

  get cpfCnpj() {
    return this.clienteForm.get('cpfCnpj');
  }  

  get email() {
    return this.clienteForm.get('email');
  }

  get celular() {
    return this.clienteForm.get('celular');
  }

  get telefone() {
    return this.clienteForm.get('telefone');
  }

  // Reset student form's values
  ResetForm() {
    this.clienteForm.reset();
  }  
 
  submitClienteData() {
    this.crudApi.AddCliente(this.clienteForm.value); 
    this.toastr.success(this.clienteForm.controls['nome'].value + ' adicionado com sucesso!'); 
    this.router.navigate(['list-cliente']); 
   };

}