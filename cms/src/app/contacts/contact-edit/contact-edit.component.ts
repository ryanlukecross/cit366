import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Contact } from '../contact.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
   selector: 'cms-contact-edit',
   templateUrl: './contact-edit.component.html',
   styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
   contact: Contact = null;
   groupContacts: Contact[] = [];
   editMode: boolean = false;
   hasGroup: boolean = false;
   id: string;
   subscription: Subscription;
   originalContact: Contact;
   invalidGroupContact: boolean = false;
   constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) { }

   ngOnInit() {

      this.subscription = this.route.params
         .subscribe(
            (params: Params) => {
               this.id = params['id'];

               if (!this.id) {
                  this.editMode = false;
                  return;
               }

               this.originalContact = this.contactService.getContact(this.id);

               if (!this.originalContact) {
                  this.editMode = false;
                  return;
               }

               this.editMode = true;
               console.log("Original Contact: " + this.originalContact);


               this.contact = JSON.parse(JSON.stringify(this.originalContact));

               if (this.contact.group) {
                  this.groupContacts = this.contact.group.slice();
               }
            }
         );
   }

   onCancel() {
      this.router.navigate(['/contacts']);
   }

   onRemoveItem(idx: number) {
      if (idx < 0 || idx >= this.groupContacts.length) {
         return;
      }

      this.groupContacts.splice(idx, 1);
      this.invalidGroupContact = false;
   }

   onSubmit(form: NgForm) {
      const values = form.value;
      const newContact = new Contact(values.id, values.name, values.email, values.phone, values.imageUrl, this.groupContacts);
      console.log("URL: " + values.contactUrl);

      if (this.editMode == true) {
         console.log("onsubmit - contact edit component line 53. editMode: " + this.editMode);
         this.contactService.updateContact(this.originalContact, newContact);
      } else {
         this.contactService.addContact(newContact);
      }

      this.router.navigate(['/contacts']);
   }

   addToGroup($event: any) {
      let selectedContact: Contact = $event.dragData;
      this.invalidGroupContact = this.isInvalidContact(selectedContact);
      if (this.invalidGroupContact) {
         console.log("Invalid Contact! contact-edit.component.ts:88");
         return;
      }
      console.log("Adding to group: " + selectedContact.name)
      this.groupContacts.push(selectedContact);
      this.invalidGroupContact = false;
   }

   isInvalidContact(newContact: Contact) {
      if (!newContact) {
         return true;
      }

      if (newContact.contactId === this.contact.contactId) {
         return true;
      }

      for (let i = 0; i < this.groupContacts.length; i++) {
         if (newContact.contactId === this.groupContacts[i].contactId) {
            return true;
         }
      }
      return false;
   }

   onDestroy() {
      this.subscription.unsubscribe();
   }

}
