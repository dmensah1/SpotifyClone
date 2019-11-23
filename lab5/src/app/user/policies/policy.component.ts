import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { PolicyData } from '../policy.model';


@Component({
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {

  isAdmin = false;
  policyExists = false;
  policies: PolicyData[]  = [];
  private adminAuthListenerSubs: Subscription;
  private policySub: Subscription;


  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isAdmin = this.authService.getIsAdminAuth();
    this.adminAuthListenerSubs = this.authService.getAdminAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isAdmin = isAuthenticated;
    });

    this.authService.getPolicy();
    this.policySub = this.authService.getPolicyUpdateListener()
 .subscribe((policys: PolicyData[]) => {
   this.policies = policys;
  });
}

  makePolicy(form: NgForm) {
    if (form.invalid) { return; };
    this.authService.addPolicy(form.value.policy);
    form.resetForm();
    this.policyExists = true;
  }
}
