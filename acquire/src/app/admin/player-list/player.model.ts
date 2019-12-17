export class Player {
   public _id: string;
   public username: string;
   public password: string;
   public first_name: string;
   public last_name: string;
   public total_dollars_earned: number;
   public image_url: string; // https://live.staticflickr.com/5754/21701460995_f57f43094f_b.jpg
   public game_piece_url: string; // https://live.staticflickr.com/5649/21738960304_8b8e5ee854_b.jpg

   // https://live.staticflickr.com/2910/33677894546_09014d4392_b.jpg


   constructor(username: string, password: string, first_name: string, last_name: string, total_dollars_earned: number, image_url: string, game_piece_url: string) {
      this.username = username;
      this.password = password;
      this.first_name = first_name;
      this.last_name = last_name;
      this.total_dollars_earned = total_dollars_earned;
      this.image_url = image_url;
      this.game_piece_url = game_piece_url;
   };
}