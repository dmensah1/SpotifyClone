import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(public authService: AuthService) {}
  // to add new user with user input data from form
  signup(form: NgForm) {
    if (form.invalid) { return; }
    this.authService.createUser(form.value.email, form.value.password);
  }
}
