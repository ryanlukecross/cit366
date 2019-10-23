import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
   selector: 'cms-contacts-detail',
   templateUrl: './contacts-detail.component.html',
   styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {

   contact: Contact;
   constructor(private contactService: ContactService) { }

   ngOnInit() {
      this.contactService.contactSelectedEvent.subscribe(
         (contact: Contact) => {
            this.contact = contact;
         }

      );
   }

}
