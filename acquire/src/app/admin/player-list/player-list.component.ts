import { Component, OnInit } from '@angular/core';
import { Player } from './player.model';
import { PlayerService } from '../player.service';
import { FormsModule } from '@angular/forms';

@Component({
   selector: 'app-player-list',
   templateUrl: './player-list.component.html',
   styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
   players: Player[];
   constructor(private playerService: PlayerService) { }

   ngOnInit() {

      this.playerService.playerListChangedEvent
         .subscribe(
            (players: Player[]) => {
               this.players = players;
            }
         );
      this.playerService.getPlayers();

   }

}
