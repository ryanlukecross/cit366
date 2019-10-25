import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DocumentsComponent } from './documents/documents.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { ContactsComponent } from './contacts/contacts.component';

const appRoutes: Routes = [
   { path: '', redirectTo: '/documents', pathMatch: 'full' },
   { path: 'documents', component: DocumentsComponent },
   { path: 'messages', component: MessageListComponent, pathMatch: 'full' },
   { path: 'contacts', component: ContactsComponent, pathMatch: 'full' }
]

@NgModule({
   declarations: [],
   imports: [
      CommonModule
   ]
})
export class AppRoutingModule { }
