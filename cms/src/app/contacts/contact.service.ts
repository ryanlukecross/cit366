import { Injectable, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
   providedIn: 'root'
})
export class ContactService implements OnInit {
   contactSelectedEvent = new Subject<Contact>();
   contactListChangedEvent = new Subject<Contact[]>();
   contacts: Contact[];
   maxContactId: number;
   constructor(private http: HttpClient) { this.contacts = MOCKCONTACTS }

   ngOnInit() {

   }

   storeContacts() {
      const contacts = JSON.parse(JSON.stringify(this.contacts));
      this.http
         .put(
            'https://rlccms.firebaseio.com/contacts.json',
            contacts
         )
         .subscribe(response => {
            console.log(response);
         });
   }

   getContacts() {
      this.http.get<Contact[]>('https://rlccms.firebaseio.com/contacts.json')
         .subscribe(
            // success function
            (contacts: Contact[]) => {
               this.contacts = contacts.sort(function (a, b) {
                  if (a.contactId > b.contactId) {
                     return 1;
                  } else if (a.contactId < b.contactId) {
                     return -1;
                  } else {
                     return 0;
                  }
               });
               this.maxContactId = this.getMaxId();
               this.contactListChangedEvent.next(contacts.slice());
               console.log(contacts.toString());
               console.log(this.contacts.toString());

            },
            (error: any) => {
               console.log("Error at contact.service.ts line 57: " + error.toString());
               return;
            }
         )
      return;
   }

   addContact(newContact: Contact) {
      this.maxContactId = this.getMaxId();
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
