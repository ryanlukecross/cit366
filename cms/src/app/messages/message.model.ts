import { TestBed } from '@angular/core/testing';

export class Message {
   constructor(
      /* will add public _id: string */
      public id: string,
      public subject: string,
      public msgText: string,
      public sender: string /* Going to be Contact */
   ) { }
   toString() {
      let text = "ID: " + this.id + " | Subject: " + this.subject + " | MessageText: " + this.msgText + " | Sender: " + this.sender;
      return text;
   }
}