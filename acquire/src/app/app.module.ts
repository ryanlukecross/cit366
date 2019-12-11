import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerListComponent } from './admin/player-list/player-list.component';
import { PlayerDetailComponent } from './admin/player-list/player-detail/player-detail.component';
import { AdminComponent } from './admin/admin.component';
import { PlayerEditComponent } from './admin/player-list/player-edit/player-edit.component';

@NgModule({
   declarations: [
      AppComponent,
      PlayerListComponent,
      PlayerDetailComponent,
      AdminComponent,
      PlayerEditComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule
   ],
   providers: [],
   bootstrap: [AppComponent]
})
export class AppModule { }
