import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public authService: AuthService) {}


  login(form: NgForm) {
    if (form.invalid) { return; }
    const email = form.value.email;
    // checking whether user logging in is an admin
    if (email.indexOf('@admin.com') !== -1) {
      this.authService.adminLogin(form.value.email, form.value.password);
    } else {
      this.authService.userLogin(form.value.email, form.value.password);
    }
  }
}
