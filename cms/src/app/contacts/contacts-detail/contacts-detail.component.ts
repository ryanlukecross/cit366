import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
   selector: 'cms-contacts-detail',
   templateUrl: './contacts-detail.component.html',
   styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {
   @Input() contact: Contact;
   @Output() selectedContact = new EventEmitter<void>();
   constructor() { }

   ngOnInit() {
   }

   onSelected() {
      this.selectedContact.emit();
   }

}
