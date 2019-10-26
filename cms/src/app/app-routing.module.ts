import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DocumentsComponent } from './documents/documents.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';

const appRoutes: Routes = [
   { path: '', redirectTo: '/documents', pathMatch: 'full' },
   {
      path: 'documents', component: DocumentsComponent, children: [
         { path: 'new', component: DocumentEditComponent },
         { path: ':id', component: DocumentDetailComponent },
         { path: ':id/edit', component: DocumentEditComponent }
      ]
   },
   { path: 'messages', component: MessageListComponent },
   {
      path: 'contacts', component: ContactsComponent, children: [
         { path: 'new', component: ContactEditComponent },
         { path: ':id', component: ContactDetailComponent },
         { path: ':id/edit', component: ContactEditComponent }
      ]
   }
]

// const appRoutes2: Routes = [
//    { path: '', redirectTo: '/documents', pathMatch: 'full' },
//    {
//       path: 'documents', component: DocumentsComponent, children: [
//          { path: 'document-detail' },
//          { path: 'document-item' },
//          { path: 'document-list' }
//       ]
//    },
//    {
//       path: 'messages', component: MessageListComponent, children: [
//          { path: 'message-edit' },
//          { path: 'message-item' },
//          { path: 'message-list' }
//       ]
//    },
//    {
//       path: 'contacts', component: ContactsComponent, children: [
//          {
//             path: 'contact-list', component: ContactListComponent, children: [
//                { path: 'contact-item' }
//             ]
//          },
//          { path: 'contacts-detail' }
//       ]
//    },
//    { path: '**', component: ContactsComponent }
// ]

@NgModule({
   declarations: [],
   imports: [
      CommonModule,
      RouterModule.forRoot(appRoutes)
   ],
   exports: [
      RouterModule
   ]
})
export class AppRoutingModule { }
