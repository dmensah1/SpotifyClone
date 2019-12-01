import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  templateUrl: './deactivate.component.html',
  styleUrls: ['./deactivate.component.css']
})
export class DeactivateComponent {

  constructor(public authService: AuthService) {}

  // to deactivate user by removing and adding new user, could prob be done in a more efficient way
  deactivateUser(form: NgForm) {
    this.authService.deleteUser(form.value.email);
    this.authService.createNewUser(form.value.email, form.value.password, false);
  }

  // to re-activate the user account
  activateUser(form: NgForm) {
    this.authService.deleteUser(form.value.email);
    this.authService.createNewUser(form.value.email, form.value.password, true);
  }
}
