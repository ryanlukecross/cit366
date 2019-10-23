import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../message.model';

@Component({
   selector: 'cms-message-edit',
   templateUrl: './message-edit.component.html',
   styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
   @ViewChild('subject', { static: false }) subjectInputRef: ElementRef;
   @ViewChild('msgText', { static: false }) msgTextInputRef: ElementRef;
   currentSender: string = "Ryan Cross"; // Need to change to a number (messages are sent by number)
   @Output() messageAdded = new EventEmitter<Message>();
   constructor() { }

   ngOnInit() {
   }

   onSendMessage() {
      const subject = this.subjectInputRef.nativeElement.value;
      const msgText = this.msgTextInputRef.nativeElement.value;
      const newMessage = new Message('id', subject, msgText, this.currentSender);
      this.messageAdded.emit(newMessage);
      console.log("Adding Message || " + newMessage.toString);
   }

}
