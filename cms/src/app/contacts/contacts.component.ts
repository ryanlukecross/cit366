import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';

@Component({
   selector: 'cms-contacts',
   templateUrl: './contacts.component.html',
   styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
   @Input() contact: Contact;
   @Output() contactWasSelected = new EventEmitter<Contact>();

   selectedContact: Contact;

   constructor() { }

   ngOnInit() {
   }



}
