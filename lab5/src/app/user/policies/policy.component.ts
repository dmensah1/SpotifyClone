import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { PolicyData } from '../policy.model';
import { ParamMap, ActivatedRoute } from '@angular/router';


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
  private policyId: string;


  constructor(private authService: AuthService, public route: ActivatedRoute) {}

  // checking user authorization upon page init since only admin can edit the form
  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('policyId')) {
        this.policyId = paramMap.get('policyId');
      }
    });
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
  // to make new policy
  makePolicy(form: NgForm) {
    if (form.invalid) { return; }
    this.authService.addPolicy(form.value.policy);
    form.resetForm();
    this.policyExists = true;
  }
  // to edit existing policy
  editPolicy(form: NgForm) {
    this.authService.deletePolicy(form.value.policy);
    this.authService.addPolicy(form.value.newPolicy);
    form.resetForm();
  }
}
