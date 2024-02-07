import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  hide = true;
  loginForm: FormGroup;
  

  constructor(private fb: FormBuilder){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      clave: ['', Validators.required],
    })
  }

  onSubmit(): void{
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      this.loginForm.get('email')?.setValue('');
      this.loginForm.get('clave')?.setValue('');
    }else{
      alert("Entro");
    }
  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }
}
