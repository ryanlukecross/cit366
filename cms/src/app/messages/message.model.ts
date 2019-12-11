import { Contact } from '../contacts/contact.model';

export class Message {
   constructor(
      public _id: string,
      public id: string,
      public subject: string,
      public msgText: string,
      public sender: Contact
   ) { }
   toString() {
      let text = "ID: " + this.id + " | Subject: " + this.subject + " | MessageText: " + this.msgText + " | Sender: " + this.sender;
      return text;
   }
}