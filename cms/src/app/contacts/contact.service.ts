import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
@Injectable({
   providedIn: 'root'
})
export class ContactService implements OnInit {
   contactSelectedEvent = new EventEmitter<Contact>();
   contacts: Contact[] = [];
   constructor() { this.contacts = MOCKCONTACTS }

   ngOnInit() {

   }

   getContact(id: string) {
      for (const contact of this.contacts) {
         if (contact.contactId === id) {
            return contact;
         }
      }
   }

   getContacts() {
      return this.contacts.slice();
   }


}
