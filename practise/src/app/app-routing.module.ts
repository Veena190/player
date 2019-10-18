import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { PlayersComponent } from './players/players.component';
import { PlayerDetailComponent }  from './player-detail/player-detail.component'
import { PlayerFormComponent }  from './player-form/player-form.component'

const routes: Routes = [
    
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'players', component: PlayersComponent },
    { path: 'detail/:id', component: PlayerDetailComponent },
    { path: 'form', component: PlayerFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
