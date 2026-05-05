import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  private http = inject(HttpClient); 
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {

      const loginData = this.loginForm.value;
      this.http.post('http://localhost:8090/customer/login', loginData, { withCredentials: true }).subscribe({
        next: (response) => { // işlem başarılı olduğunda çalışacak kod
           const {cid, name, surname, email} = response as any;
           localStorage.setItem('cid', cid);
           localStorage.setItem('name', name + ' ' + surname);
           localStorage.setItem('email', email);
           // redirect to products page
           window.location.href = '/products';
        },
        error: (error) => { // işlem başarısız olduğunda çalışacak kod
          alert('Login failed: ' + error.error.message);
        }
      })
      
    }
  }





}
