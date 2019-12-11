import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';

@Component({
   selector: 'cms-document-edit',
   templateUrl: './document-edit.component.html',
   styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
   originalDocument: Document;
   document: Document;
   editMode = false;
   subscription: Subscription;
   documentSubscription: Subscription;
   id: string;
   constructor(private documentService: DocumentService, private router: Router, private route: ActivatedRoute) { }
   ngOnInit() {

      this.subscription = this.route.params
         .subscribe(
            (params: Params) => {
               this.id = params['id'];

               if (!this.id) {
                  this.editMode = false;
                  return;
               }

               this.originalDocument = this.documentService.getDocument(this.id);

               if (!this.originalDocument) {
                  this.editMode = false;
                  return;
               }

               this.editMode = true;
               console.log("Original Document: " + this.originalDocument);


               this.document = JSON.parse(JSON.stringify(this.originalDocument));

            }
         );
   }

   onCancel() {
      this.router.navigate(['/documents']);
   }

   onSubmit(form: NgForm) {
      const values = form.value;
      const newDocument = new Document(null, "", values.name, values.description, values.documentUrl, null);
      console.log("URL: " + values.documentUrl);

      if (this.editMode == true) {
         console.log("onsubmit - document edit component line 53. editMode: " + this.editMode);
         this.documentService.updateDocument(this.originalDocument, newDocument);
      } else {
         this.documentService.addDocument(newDocument);
      }

      this.router.navigate(['/documents']);
   }

   onDestroy() {
      this.subscription.unsubscribe();
   }

}
