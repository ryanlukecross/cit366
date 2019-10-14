import { Injectable, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
@Injectable({
   providedIn: 'root'
})
export class ContactService implements OnInit {
   contacts: Contact[] = [];
   constructor() { }

   ngOnInit() {
      this.contacts = MOCKCONTACTS;
   }
}
