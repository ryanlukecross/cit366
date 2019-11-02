import { Injectable, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
@Injectable({
   providedIn: 'root'
})
export class ContactService implements OnInit {
   contactSelectedEvent = new Subject<Contact>();
   contactListChangedEvent = new Subject<Contact[]>();
   contacts: Contact[];
   maxContactId: number;
   constructor() { this.contacts = MOCKCONTACTS }

   ngOnInit() {

   }

   addContact(newContact: Contact) {
      if (typeof (newContact) === undefined || newContact === null) {
         return;
      }
      this.maxContactId++;
      newContact.contactId = this.maxContactId.toString();
      this.contacts.push(newContact);
      const contactsListClone = this.contacts.slice();
      this.contactListChangedEvent.next(contactsListClone);
   }

   getContact(id: string): Contact {
      for (const contact of this.contacts) {
         if (contact.contactId == id) {
            return contact;
         }
      }
      return null;
   }

   getContacts() {
      return this.contacts.slice();
   }

   updateContact(originalContact: Contact, newContact: Contact) {
      if (typeof (newContact) === undefined ||
         newContact === null ||
         typeof (originalContact) === undefined ||
         originalContact === null) {
         return;
      }

      const pos = this.contacts.indexOf(originalContact);

      if (pos < 0) {
         return;
      }

      newContact.contactId = originalContact.contactId;
      this.contacts[pos] = newContact;
      const contactsListClone = this.contacts.slice();
      this.contactListChangedEvent.next(contactsListClone);
   }


   deleteContact(contact: Contact) {
      if (typeof (contact) === undefined || contact === null) {
         return;
      }

      const pos = this.contacts.indexOf(contact);
      if (pos < 0) {
         return;
      }

      this.contacts.splice(pos, 1);
      this.contactListChangedEvent.next(this.contacts.slice());
   }



   getMaxId(): number {
      let maxId = 0;
      for (const contact of this.contacts) {
         let currentId: number = parseInt(contact.contactId);
         if (currentId > maxId) {
            maxId = currentId;
         }
      }
      return maxId;
   }


}
