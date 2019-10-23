import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
   { path: '', redirectTo: '/documents', pathMatch: 'full' },
   { path: 'documents', redirectTo: '/documents' },
   { path: 'messages', redirectTo: '/documents', pathMatch: 'full' },
   { path: 'contacts', redirectTo: '/documents', pathMatch: 'full' },
]

@NgModule({
   declarations: [],
   imports: [
      CommonModule
   ]
})
export class AppRoutingModule { }
