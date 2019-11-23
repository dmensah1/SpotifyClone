import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: 'addAdmin.component.html',
  styleUrls: ['addAdmin.component.css']
})
export class AddAdminComponent {

  constructor(public authService: AuthService) {}

  addAdmin(form: NgForm) {
    if (form.invalid) { return; }
    const email = form.value.newAdmin + '@admin.com';
    this.authService.createAdmin(email, form.value.password);
  }
}
