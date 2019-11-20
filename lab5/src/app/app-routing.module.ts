import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongListComponent } from './songs/song-list/song-list.component';
import { SongCreateComponent } from './songs/song-create/song-create.component';


const routes: Routes = [
  { path: '', component: SongListComponent },
  { path: 'create', component: SongCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule {}
