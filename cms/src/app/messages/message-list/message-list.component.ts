import { Component, OnInit } from '@angular/core';
import { Message } from "../message.model";
import { MessageService } from '../message.service';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/contacts/contact.model';
@Component({
   selector: 'cms-message-list',
   templateUrl: './message-list.component.html',
   styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
   messages: Message[] = [];
   messageSubscription: Subscription;

   constructor(private messageService: MessageService) {
   }

   ngOnInit() {
      this.messageSubscription = this.messageService.messageListChangedEvent
         .subscribe(
            (messages: Message[]) => {
               this.messages = messages;
            }
         );

      this.messageService.getMessages();
   }

   onAddMessage(message: Message) {
      this.messageService.addMessage(message);
   }

}