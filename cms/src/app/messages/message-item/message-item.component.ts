import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { ContactService } from 'src/app/contacts/contact.service';
import { Contact } from 'src/app/contacts/contact.model';

@Component({
   selector: 'cms-message-item',
   templateUrl: './message-item.component.html',
   styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
   @Input() message: Message;
   messageSender: string = '';
   constructor(private contactService: ContactService) { }

   ngOnInit() {
      this.contactService.getContacts;
      let contact: Contact = this.contactService.getContact(this.message.sender);
      this.messageSender = contact.name;
   }

}
