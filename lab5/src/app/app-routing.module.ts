import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongListComponent } from './songs/song-list/song-list.component';
import { SongCreateComponent } from './songs/song-create/song-create.component';
import { ReviewCreateComponent } from './reviews/review-create/review-create.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { AuthGuard } from './user/auth.guard';
import { AddAdminComponent } from './user/addAdmin/addAdmin.component';
import { PrivacyPolicyComponent } from './user/policies/policy.component';
import { DmcaComponent } from './user/dmca/dmca.component';
import { TakedownProcComponent } from './user/takedownProc/takedown-proc.component';


const routes: Routes = [
  { path: '', component: SongListComponent },
  { path: 'create', component: SongCreateComponent, canActivate: [AuthGuard] },
  { path: 'review-create/:songId', component: ReviewCreateComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'add-admin', component: AddAdminComponent},
  { path: 'policy', component: PrivacyPolicyComponent},
  { path: 'dmca', component: DmcaComponent},
  { path: 'takedown', component: TakedownProcComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule {}
