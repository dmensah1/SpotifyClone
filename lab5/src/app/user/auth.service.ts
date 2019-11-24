import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { PolicyData } from './policy.model';
import { map } from 'rxjs/operators';
import { Dmca } from './dmca.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private isAdmin = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  private adminAuthStatusListener = new Subject<boolean>();

  private policy: PolicyData[] = [];
  private policyUpdated = new Subject<PolicyData[]>();

  private dmca: Dmca[] = [];
  private dmcaUpdated = new Subject<Dmca[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getIsAdminAuth() {
    return this.isAdmin;
  }

  getAdminAuthStatusListener() {
    return this.adminAuthStatusListener.asObservable();
  }

  addPolicy(policy: string) {
    const policyData: PolicyData = {policy: policy};
    this.http.post('http://localhost:3000/api/policy', policyData)
    .subscribe(response => {
      console.log(response);
    });
  }

  addDmcaPolicy(policy: string) {
    const dmcaData: Dmca = {policy: policy};
    this.http.post('http://localhost:3000/api/dmca', dmcaData)
    .subscribe(response => {
      console.log(response);
    });
  }

  getPolicy() {
      this.http.get<{message: string, policy: any}>(
        'http://localhost:3000/api/policy'
        )
        .pipe(map((policyData) => {
          return policyData.policy.map(policy => {
            return {
              id: policy._id,
              policy: policy.policy
            };
          });
        }))
      .subscribe((updatedPolicy) => {
        this.policy = updatedPolicy;
        this.policyUpdated.next([...this.policy]);
      });
  }

  getDmcaPolicy() {
    this.http.get<{message: string, policy: any}>(
      'http://localhost:3000/api/dmca'
      )
      .pipe(map((policyData) => {
        return policyData.policy.map(policy => {
          return {
            id: policy._id,
            policy: policy.policy
          };
        });
      }))
    .subscribe((updatedDmca) => {
      this.dmca = updatedDmca;
      this.dmcaUpdated.next([...this.dmca]);
    });
}

  getPolicyUpdateListener() {
    return this.policyUpdated.asObservable();
  }

  getDmcaUpdateListener() {
    return this.dmcaUpdated.asObservable();
  }


  createUser(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.http.post('http://localhost:3000/api/user/signup', authData)
    .subscribe(response => {
      console.log(response);
    });
  }

  createAdmin(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.http.post('http://localhost:3000/api/admin/signup', authData)
    .subscribe(response => {
      console.log(response);
    });
  }

  userLogin(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.http.post<{token: string, expiresIn: number}>('http://localhost:3000/api/user/login', authData)
    .subscribe(response => {
      const token = response.token;
      this.token = token;
      if (token) {
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        console.log(expirationDate);
        this.saveAuthData(token, expirationDate);
        this.router.navigate(['/']);
      }
    });
  }

  adminLogin(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.http.post<{token: string, expiresIn: number}>('http://localhost:3000/api/admin/login', authData)
    .subscribe(response => {
      const token = response.token;
      this.token = token;
      if (token) {
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.isAdmin = true;
        this.adminAuthStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        console.log(expirationDate);
        this.saveAuthData(token, expirationDate);
        this.router.navigate(['/']);
      }
    });
  }

  // automatically authenticate logged in user if page is refreshed
  autoAuthUser() {
   const authInformation = this.getAuthData();
   if (!authInformation) { return; }
   const now = new Date();
   const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
   if (expiresIn > 0) {
     this.token = authInformation.token;
     this.isAuthenticated = true;
     this.setAuthTimer(expiresIn / 1000);
     this.authStatusListener.next(true);
   }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.authStatusListener.next(false);
    this.adminAuthStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration)
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token && !expirationDate) { return; }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    };
  }
}
