import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
@Injectable({
   providedIn: 'root'
})
export class ContactService implements OnInit {
   contactSelectedEvent = new EventEmitter<Contact>();
   contactChangedEvent = new EventEmitter<Contact[]>();
   contacts: Contact[];
   constructor() { this.contacts = MOCKCONTACTS }

   ngOnInit() {

   }

   deleteContact(contact: Contact) {
      if (contact === null) {
         return;
      }

      const pos = this.contacts.indexOf(contact);
      if (pos < 0) {
         return;
      }

      this.contacts.splice(pos, 1);
      this.contactChangedEvent.emit(this.contacts.slice());
   }

   getContact(id: string): Contact {
      for (const contact of this.contacts) {
         if (contact.contactId === id) {
            return contact;
         }
      }

      return null;
   }

   getContacts() {
      return this.contacts.slice();
   }


}
