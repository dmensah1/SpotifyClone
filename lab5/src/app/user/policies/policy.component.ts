import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';


@Component({
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {

  isAdmin = false;
  policyText: any = {
    content: 'Security and Privacy Policy.'
  };
  private adminAuthListenerSubs: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isAdmin = this.authService.getIsAdminAuth();
    this.adminAuthListenerSubs = this.authService.getAdminAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isAdmin = isAuthenticated;
    });
    const policyContainer = document.getElementById('policy-container');
    policyContainer.innerHTML = this.policyText.content;
  }

  displayPolicy(form: NgForm) {
    this.policyText.content = form.value.policy;
   /* const policyContainer = document.getElementById('policy-container');
    policyContainer.innerHTML = this.policyText.content; */
    form.reset();
  }
}
