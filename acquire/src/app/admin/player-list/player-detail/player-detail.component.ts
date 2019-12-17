import { Component, OnInit } from '@angular/core';
import { Player } from '../player.model';
import { PlayerService } from '../../player.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
   selector: 'app-player-detail',
   templateUrl: './player-detail.component.html',
   styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit {
   username: string;
   player: Player;
   constructor(private playerService: PlayerService, private router: Router, private route: ActivatedRoute) { }

   ngOnInit() {
      this.route.params
         .subscribe(
            (params: Params) => {
               this.username = params['username'];
               this.player = this.playerService.getPlayer(this.username);
            }
         );
   }

   onDelete() {
      this.playerService.deletePlayer(this.player);
      this.router.navigate(["/admin/players"]);
   }
}