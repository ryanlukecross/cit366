import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { Contact } from '../../contacts/contact.model';

@Component({
   selector: 'cms-message-edit',
   templateUrl: './message-edit.component.html',
   styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
   @ViewChild('subject', { static: false }) subjectInputRef: ElementRef;
   @ViewChild('msgText', { static: false }) msgTextInputRef: ElementRef;
   currentSender: Contact = {
      _id: null, contactId: '25',
      name: 'Ryan Cross',
      email: 'cro16052@byui.edu',
      phone: '208-987-1234',
      imageUrl: 'http://images.fanpop.com/images/image_uploads/Heath-in-A-Knight-s-Tale-a-knights-tale-751106_1600_900.jpg',
      group: null
   };

   // Need to change to a number (messages are sent by number)
   constructor(private messageService: MessageService) { }

   ngOnInit() {
   }

   onSendMessage() {
      const subject = this.subjectInputRef.nativeElement.value;
      const msgText = this.msgTextInputRef.nativeElement.value;
      const newMessage = new Message(null, 'id', subject, msgText, this.currentSender);
      this.messageService.addMessage(newMessage);
   }

}
