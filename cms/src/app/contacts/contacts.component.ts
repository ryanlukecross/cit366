import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';

@Component({
   selector: 'cms-contacts',
   templateUrl: './contacts.component.html',
   styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
   contact: Contact;

   selectedContact: Contact;

   constructor(private contactService: ContactService) { }

   ngOnInit() {
      this.contactService.selectedContactEvent
         .subscribe(
            (contact: Contact) => {
               this.contact = contact;
            }
         );
   }



}
