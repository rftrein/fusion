import {Component, OnInit, AfterViewInit} from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import { ClienteService } from '../../../service/cliente-service';    
import {ActivatedRoute,Router} from "@angular/router"; // ActivatedRoue is used to get the current associated components information.
import {Location} from '@angular/common'; // Location service is used to go back to previous component
import {ToastrService} from 'ngx-toastr';

@Component({
   selector: 'app-edit-cliente',
   templateUrl: './edit-cliente.component.html',
   styleUrls: ['./edit-cliente.component.css']
})

export class EditClienteComponent implements OnInit {

   editForm: FormGroup; 

   constructor(
      private crudApi: ClienteService,
      private fb: FormBuilder, 
      private location: Location, 
      private actRoute: ActivatedRoute,
      private router: Router, 
      private toastr: ToastrService 
   ) {}

   ngOnInit() {
      this.updateStudentData(); 
      const id = this.actRoute.snapshot.paramMap.get('id');
      this.crudApi.GetCliente(id).valueChanges().subscribe(data => {
         this.editForm.setValue(data) 
      })
   }

   // Accessing form control using getters
  get nome() {
    return this.editForm.get('nome');
  }

  get documento() {
    return this.editForm.get('documento');
  }  

  get cpfCnpj() {
    return this.editForm.get('cpfCnpj');
  }  

  get email() {
    return this.editForm.get('email');
  }

  get celular() {
    return this.editForm.get('celular');
  }

  get telefone() {
    return this.editForm.get('telefone');
  }

   // Contains Reactive Form logic
   updateStudentData() {
      this.editForm = this.fb.group({
        nome: ['', [Validators.required, Validators.minLength(5)]],
        documento: [''],
        cpfCnpj: [''],
        email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
        celular: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        telefone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
      })
   }

   // Go back to previous component
   goBack() {
      this.location.back();
   }

   // Below methods fire when somebody click on submit button
   updateForm() {
      this.crudApi.UpdateCliente(this.editForm.value); // Update student data using CRUD API
      this.toastr.success(this.editForm.controls['nome'].value + ' atualizado com sucesso!'); // Show succes message when data is successfully submited
      this.router.navigate(['list-cliente']); 
   }
}