import { Component, OnInit } from '@angular/core';
import { Player } from './player.model';

@Component({
   selector: 'app-player-list',
   templateUrl: './player-list.component.html',
   styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
   player: Player;
   constructor() { }

   ngOnInit() {
   }

}
