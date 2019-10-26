import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
   providedIn: 'root'
})
export class MessageService {
   messages: Message[];
   messageChangeEvent = new EventEmitter<Message[]>();

   constructor() { this.messages = MOCKMESSAGES; }

   getMessage(id: string): Message {
      for (const message of this.messages) {
         if (message.id === id) {
            return message;
         }
         return null;
      }
   }

   getMessages() {
      return this.messages.slice();
   }

   addMessage(message: Message) {
      this.messages.push(message);
      this.messageChangeEvent.emit(this.messages.slice());
   }
}
