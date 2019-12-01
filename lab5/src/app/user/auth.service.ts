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

  // creates a new security and privacy policy
  addPolicy(policy: string) {
    const policyData: PolicyData = {id: null, policy: policy};
    this.http.post<{policyId: string}>('http://localhost:3000/api/policy', policyData)
    .subscribe(response => {
      console.log(response);
    });
  }
  // to delete snp policy
  deletePolicy(policy: string) {
    this.http.delete('http://localhost:3000/api/policy/delete/' + policy)
    .subscribe(response => {
      console.log(response);
    });
  }

  // to delete dmca policy
  deleteDmca(policy: string) {
    this.http.delete('http://localhost:3000/api/dmca/delete/' + policy)
    .subscribe(response => {
      console.log(response);
    });
  }

  // creates a new dmca policy
  addDmcaPolicy(policy: string) {
    const dmcaData: Dmca = {policy: policy};
    this.http.post('http://localhost:3000/api/dmca', dmcaData)
    .subscribe(response => {
      console.log(response);
    });
  }

  // returns security and privacy policy & updates front-end collection of policies
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

  // returns dmca policy and updates front-end collection of dmca policies
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


  // creates a new user in the user DB
  createUser(email: string, password: string) {
    const authData: AuthData = {email: email, password: password, isActive: true};
    this.http.post('http://localhost:3000/api/user/signup', authData)
    .subscribe(response => {
      console.log(response);
    });
  }

   // creates a new user in the user and mark inactive in DB
   createNewUser(email: string, password: string, isActive: boolean) {
    const authData: AuthData = {email: email, password: password, isActive: isActive};
    this.http.post('http://localhost:3000/api/user/signup', authData)
    .subscribe(response => {
      console.log(response);
    });
  }

  // delete a user from the DB
  deleteUser(email: string) {
    this.http.delete('http://localhost:3000/api/user/delete/' + email)
    .subscribe(res => {
      console.log(res);
    });
  }

  // creates a new admin in the admin DB
  createAdmin(email: string, password: string) {
    const authData: AuthData = {email: email, password: password, isActive: true};
    this.http.post('http://localhost:3000/api/admin/signup', authData)
    .subscribe(response => {
      console.log(response);
    });
  }

  // called upon user log in
  userLogin(email: string, password: string) {
    const authData: AuthData = {email: email, password: password, isActive: true};
    this.http.post<{token: string, expiresIn: number, isActive: boolean}>('http://localhost:3000/api/user/login', authData)
    .subscribe(response => {
      if (response.isActive === false) {
        alert('Deactive user. Must contact site administrator at demirmensah@hotmail.com');
        return;
      }
      const token = response.token;
      this.token = token;
      if (token) {
        // if a valid token is returned then a timer is set, bool variables are updated
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
    setTimeout(() => {
        if (!this.getIsAuth()) {
          alert('Login credentials are wrong.');
          return;
    }
      }, 1000);
  }

  // called upon admin login
  adminLogin(email: string, password: string) {
    const authData: AuthData = {email: email, password: password, isActive: true};
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

  // called upon logout button being hit
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

  // sets the timer to automatically log out a user
  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration)
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  // saves the currently logged in user info into local storage to keep user logged in upon page refresh
  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  // clears user data from local storage
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  // returns the information about the logged in user form local storage
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
