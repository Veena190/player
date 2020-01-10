import { Component, OnInit } from '@angular/core';
import { Player } from './player';
import { PLAYERS } from './mock-players';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

 team = 'Indian';

 player: Player = {
    id: 1,
    name: 'Sharma',
    image: ' '
 };
 
 players = PLAYERS;
 selectedPlayer: Player;
 groupIds :any = [2];
groups: any = this.players.filter(({id}) => this.groupIds.includes(id));
play: Player[];
//plays: Player[];
  constructor(private playerService: PlayerService) { 
  
    console.log(this.players)
    console.log(this.groupIds)
    console.log(this.groups)
    console.log(this.groups[0].id)
    console.log(this.selectedPlayer)
    if(this.groups[0].id == 2){
        console.log('Done')
    } else {
        console.log('Not Done')
    }

  }

  ngOnInit() {
    this.getPlays();
  }
  
  //onSelect(p:Player):void{
    //this.selectedPlayer = p;
    //console.log('onSelect');
  //}
  
  getPlays(): void {
    //this.play = this.playerService.getPlay();
    this.playerService.getPlays().subscribe(play => this.play = play);
  }
  
 
}

