import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Dmca } from '../dmca.model';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './dmca.component.html',
  styleUrls: ['./dmca.component.css']
})
export class DmcaComponent implements OnInit {
  dmcaExists = false;
  isAdmin = false;
  dmca: Dmca[] = [];
  private dmcaAuthListenerSubs: Subscription;
  private dmcaSub: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isAdmin = this.authService.getIsAdminAuth();
    this.dmcaAuthListenerSubs = this.authService.getAdminAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isAdmin = isAuthenticated;
    });

    this.authService.getDmcaPolicy();
    this.dmcaSub = this.authService.getDmcaUpdateListener()
 .subscribe((dmcas: Dmca[]) => {
   this.dmca = dmcas;
  });
}


  makeDmcaPolicy(form: NgForm) {
    if (form.invalid) { return; }
    this.authService.addDmcaPolicy(form.value.DmcaInput);
    form.resetForm();
    this.dmcaExists = true;
  }
}
