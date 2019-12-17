import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../player-list/player.model';

@Component({
   selector: 'app-player-item',
   templateUrl: './player-item.component.html',
   styleUrls: ['./player-item.component.css']
})
export class PlayerItemComponent implements OnInit {
   @Input() player: Player;
   constructor() { }

   ngOnInit() {
   }

}
