import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { PlayerDetailComponent } from './admin/player-list/player-detail/player-detail.component';
import { PlayerListComponent } from './admin/player-list/player-list.component';
import { PlayerEditComponent } from './admin/player-list/player-edit/player-edit.component';



const routes: Routes = [
   { path: '', redirectTo: '/admin', pathMatch: 'full' },
   {
      path: 'admin', component: AdminComponent, children: [
         {
            path: 'players', component: PlayerListComponent, children: [
               { path: 'new', component: PlayerEditComponent },
               { path: ':id', component: PlayerDetailComponent },
               { path: ':id/edit', component: PlayerEditComponent }
            ]
         },

      ]
   }
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }
