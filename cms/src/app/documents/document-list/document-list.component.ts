import { Component, OnInit, OnDestroy } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
@Component({
   selector: 'cms-document-list',
   templateUrl: './document-list.component.html',
   styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
   documents: Document[];
   changeSubscription: Subscription;

   constructor(private documentService: DocumentService, private route: ActivatedRoute) { }

   ngOnInit() {
      this.documents = this.documentService.getDocuments();
      this.changeSubscription = this.documentService.documentListChangedEvent
         .subscribe(
            (documents: Document[]) => {
               this.documents = documents;
            }
         );

      this.route.params
         .subscribe(
            (params: Params) => {
               this.documents = this.documentService.getDocuments();
            }
         )


   }

   ngOnDestroy() {
      this.changeSubscription.unsubscribe();
   }
}
