import { Injectable } from '@angular/core';
import { Message } from './message.model';
// import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
   providedIn: 'root'
})
export class MessageService {
   messages: Message[] = [];
   selectedMessageEvent = new Subject<Message>();
   messageListChangedEvent = new Subject<Message[]>();

   constructor(private http: HttpClient) {
   }


   addMessage(newMessage: Message) {

      if (!newMessage) {
         return;
      }

      const headers = new HttpHeaders({
         'Content-Type': 'application/json'
      });
      const message = JSON.parse(JSON.stringify(newMessage));
      this.http
         .post<{ message: string, myMessage: Message }>(
            'http://localhost:3000/messages',
            message,
            { headers: headers }
         )
         .subscribe(response => {
            this.messages.push(newMessage);
            this.sortAndSend();
         });

   }

   getMessage(id: string): Message {
      for (const message of this.messages) {
         if (message.id == id) {
            return message;
         }
      }
      return null;
   }

   getMessages() {
      this.http.get<{ message: string, messages: Message[] }>('http://localhost:3000/messages')
         .subscribe(
            // success function
            (res) => {
               this.messages = res.messages.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
               this.messageListChangedEvent.next(this.messages.slice());
            },
            (error: any) => {
               console.log("Error at message.service.ts line 57: " + error.toString());
               return;
            }
         )
      return;
   }


   setMessages(messages: Message[]) {
      this.messages = messages;
      this.messageListChangedEvent.next(this.messages.slice());
   }

   updateMessage(originalMessage: Message, newMessage: Message) {
      if (!newMessage || !originalMessage) {
         return;
      }

      const pos = this.messages.findIndex(d => d.id === originalMessage.id);

      const headers = new HttpHeaders({
         'Content-Type': 'application/json'
      });

      newMessage._id = originalMessage._id;
      newMessage.id = originalMessage.id;

      this.http
         .put(
            'http://localhost:3000/messages/' + originalMessage.id,
            newMessage,
            { headers: headers }
         )
         .subscribe(response => {
            // this.getMessages();
            this.messages[pos] = newMessage;
            this.sortAndSend();
         });
   }

   sortAndSend() {
      this.messages.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
      this.messageListChangedEvent.next(this.messages.slice());
   }

   deleteMessage(message: Message) {
      if (typeof (message) === undefined || message === null) {
         return;
      }

      const pos = this.messages.indexOf(message);
      if (pos < 0) {
         return;
      }

      this.http.delete('http://localhost:3000/messages/' + message.id)
         .subscribe(
            (response: Response) => {
               this.messages.splice(pos, 1);
               this.sortAndSend();
            }
         );
   }
}