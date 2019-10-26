import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DocumentService } from '../document.service';
import { Document } from '../document.model';
import { WindRefService } from 'src/app/wind-ref.service';

@Component({
   selector: 'cms-document-detail',
   templateUrl: './document-detail.component.html',
   styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
   document: Document;
   id: string;
   nativeWindow: any;
   constructor(private windRefService: WindRefService, private documentService: DocumentService, private router: Router, private route: ActivatedRoute) {
      this.nativeWindow = this.windRefService.getNativeWindow();
   }

   onDelete() {
      this.documentService.deleteDocument(this.document);
      this.router.navigate(['/documents']);
   }

   onView() {
      if (this.document.url) {
         this.nativeWindow.open(this.document.url);
      }
   }

   ngOnInit() {
      this.route.params
         .subscribe(
            (params: Params) => {
               this.id = params['id'];
               this.document = this.documentService.getDocument(this.id);
               console.log(this.id);
            }
         );

   }

}
