import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})
export class AppComponent {
   n = "";
   m = "";
   title = 'message-board';

   constructor(private http: HttpClient) { };

   post() {
      console.log(this.n, this.m);
      this.http.post("http://localhost:3000/send", { msg: this.m, name: this.n }).toPromise();
      location.reload();
   }

}
