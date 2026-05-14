import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {

  private http = inject(HttpClient);
  globalName = 'Guest';

  constructor() {
    const name = localStorage.getItem('name');
    if (name) {
      this.globalName = name;
    } 
  }


  logout() {
    const answer = confirm('Are you sure you want to log out?');
    if (answer) {
    this.http.get('http://localhost:8090/customer/logout', { withCredentials: true }).subscribe({
        next: (response) => {
          localStorage.removeItem('cid');
          localStorage.removeItem('name');
          localStorage.removeItem('email');
          this.globalName = 'Guest';
          window.location.href = '/';
        },
        error: (error) => {
          alert('Logout failed. Please try again.');
        }
      })
    }
  }
  

}
