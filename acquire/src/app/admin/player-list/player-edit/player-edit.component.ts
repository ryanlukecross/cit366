import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PlayerService } from '../../player.service';
import { Player } from '../player.model';

@Component({
   selector: 'app-player-edit',
   templateUrl: './player-edit.component.html',
   styleUrls: ['./player-edit.component.css']
})
export class PlayerEditComponent implements OnInit {
   editMode: boolean;
   subscription: Subscription;
   username: string;
   player: Player;

   constructor(private playerService: PlayerService, private router: Router, private route: ActivatedRoute) { }

   ngOnInit() {

      this.subscription = this.route.params
         .subscribe(
            (params: Params) => {
               this.username = params['username'];

               if (!this.username) {
                  this.editMode = false;
                  return;
               }

               this.player = this.playerService.getPlayer(this.username);

               if (!this.player) {
                  this.editMode = false;
                  return;
               }

               this.editMode = true;
               console.log("Original Player: " + this.player);

               this.player = JSON.parse(JSON.stringify(this.player));
            }
         );
   }

   onCancel() {
      this.router.navigate(['/admin/players']);
   }


   onSubmit(form: NgForm) {
      const values = form.value;
      const newPlayer = new Player(values.username, values.password, values.first_name, values.last_name, values.total_dollars_earned, values.image_url, values.game_piece_url); // username: string, password: string, first_name: string, last_name: string, total_dollars_earned: number, image_url: string, game_piece_url: string
      console.log("URL: " + values.playerUrl);

      if (this.editMode == true) {
         console.log("onsubmit - player edit component line 59. editMode: " + this.editMode);
         this.playerService.updatePlayer(this.player, newPlayer);
      } else {
         this.playerService.addPlayer(newPlayer);
      }

      this.router.navigate(['/admin/players']);
   }


   onDestroy() {
      this.subscription.unsubscribe();
   }

}
