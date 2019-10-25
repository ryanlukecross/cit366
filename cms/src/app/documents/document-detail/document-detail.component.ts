import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DocumentsService } from '../../documents.service';

@Component({
   selector: 'cms-document-detail',
   templateUrl: './document-detail.component.html',
   styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
   document: Document;
   id: string;
   // 
   constructor(private documentService: DocumentsService, private router: Router, private route: ActivatedRoute) { }

   ngOnInit() {
      this.route.params.subscribe(
         (params: Params) => {
            this.id = params['id'];
            this.document = this.documentService.getDocument(this.id);
         }
      )
   }

}
