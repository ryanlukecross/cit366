import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerListComponent } from './admin/player-list/player-list.component';
import { PlayerDetailComponent } from './admin/player-list/player-detail/player-detail.component';
import { AdminComponent } from './admin/admin.component';
import { PlayerEditComponent } from './admin/player-list/player-edit/player-edit.component';
import { AppHeaderComponent } from './app-header.component';
import { PlayerItemComponent } from './admin/player-item/player-item.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
   declarations: [
      AppComponent,
      PlayerListComponent,
      PlayerDetailComponent,
      AdminComponent,
      PlayerEditComponent,
      AppHeaderComponent,
      PlayerItemComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      HttpClientModule
   ],
   providers: [],
   bootstrap: [AppComponent]
})
export class AppModule { }
