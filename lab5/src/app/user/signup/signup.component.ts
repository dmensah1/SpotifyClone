import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(public authService: AuthService) {}

  signup(form: NgForm) {
    if (form.invalid) { return; }
    const email = form.value.email;

    if (email.indexOf('@admin.com') !== -1) {
      this.authService.createAdmin(form.value.email, form.value.password);
    } else {
      this.authService.createUser(form.value.email, form.value.password);
    }
  }
}
