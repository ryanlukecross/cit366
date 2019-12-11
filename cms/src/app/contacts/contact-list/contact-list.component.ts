import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
   selector: 'cms-contact-list',
   templateUrl: './contact-list.component.html',
   styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
   term: string;
   contacts: Contact[] = [];
   constructor(private contactService: ContactService) { }

   ngOnInit() {
      this.contactService.contactListChangedEvent
         .subscribe(
            (contacts: Contact[]) => {
               this.contacts = contacts;
            }
         );
      this.contactService.getContacts();
   }

   onKeyPress(value: string) {
      this.term = value;
   }

   search(value: string) {
      this.term = value;
   }

}
