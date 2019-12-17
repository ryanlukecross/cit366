import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Player } from '../admin/player-list/player.model';

@Injectable({
   providedIn: 'root'
})
export class PlayerService {
   players: Player[] = [];
   selectedPlayerEvent = new Subject<Player>();
   playerListChangedEvent = new Subject<Player[]>();

   constructor(private http: HttpClient) {
   }


   addPlayer(newPlayer: Player) {

      if (!newPlayer) {
         return;
      }

      const headers = new HttpHeaders({
         'Content-Type': 'application/json'
      });
      const player = JSON.parse(JSON.stringify(newPlayer));
      this.http
         .post<{ message: string, player: Player }>(
            'http://localhost:3000/players',
            player,
            { headers: headers }
         )
         .subscribe(response => {
            this.players.push(newPlayer);
            this.sortAndSend();
         });

   }

   getPlayer(username: string): Player {
      for (const player of this.players) {
         if (player.username == username) {
            return player;
         }
      }
      return null;
   }

   getPlayers() {
      this.http.get<{ message: string, players: Player[] }>('http://localhost:3000/players')
         .subscribe(
            // success function
            (res) => {
               this.players = res.players.sort((a, b) => (a.first_name > b.first_name) ? 1 : ((b.first_name > a.first_name) ? -1 : 0));
               this.playerListChangedEvent.next(this.players.slice());
            },
            (error: any) => {
               console.log("Error at player.service.ts line 57: " + error.toString());
               return;
            }
         )
      return;
   }


   setPlayers(players: Player[]) {
      this.players = players;
      this.playerListChangedEvent.next(this.players.slice());
   }

   updatePlayer(originalPlayer: Player, newPlayer: Player) {
      if (!newPlayer || !originalPlayer) {
         return;
      }

      const pos = this.players.findIndex(d => d.username === originalPlayer.username);

      const headers = new HttpHeaders({
         'Content-Type': 'application/json'
      });

      newPlayer._id = originalPlayer._id;
      newPlayer.username = originalPlayer.username;

      this.http
         .put(
            'http://localhost:3000/players/' + originalPlayer.username,
            newPlayer,
            { headers: headers }
         )
         .subscribe(response => {
            // this.getPlayers();
            this.players[pos] = newPlayer;
            this.sortAndSend();
         });
   }

   sortAndSend() {
      this.players.sort((a, b) => (a.first_name > b.first_name) ? 1 : ((b.first_name > a.first_name) ? -1 : 0));
      this.playerListChangedEvent.next(this.players.slice());
   }

   deletePlayer(player: Player) {
      if (typeof (player) === undefined || player === null) {
         return;
      }

      const pos = this.players.indexOf(player);
      if (pos < 0) {
         return;
      }

      this.http.delete('http://localhost:3000/players/' + player.username)
         .subscribe(
            (response: Response) => {
               this.players.splice(pos, 1);
               this.sortAndSend();
            }
         );
   }
}